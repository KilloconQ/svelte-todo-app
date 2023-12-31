<script lang="ts">
	import { Task } from '../models/task';
	// TODO: logic create, edit, mark as done
	let tasks: Task[] = [];
	let newTask: string = '';
	let showInput: boolean = false;
	let inputElement: HTMLInputElement;
	let editingIndex: number | null = null;
	let editContent: string = '';
	let isEdit: boolean = false;
	let isAdd: boolean = false;

	$: {
		if (showInput) {
			inputElement && inputElement.focus();
		}
	}

	function toggleInput(): void {
		showInput = !showInput;
	}

	function addTask() {
		if (newTask.trim() === '') {
			alert('Please, write a new task.');
			return;
		}

		tasks = [...tasks, { content: newTask, completed: false }];
		newTask = '';
		showInput = false;
	}

	function startEditingTask(index: number): void {
		editingIndex = index;
		editContent = tasks[index].content ?? '';
	}

	function toggleTaskCompletion(index: number): void {
		tasks[index].completed = !tasks[index].completed;
	}

	function saveTask(): void {
		if (editContent.trim() === '') {
			alert('Please, write something for the task');
			return;
		}

		if (editingIndex !== null) {
			tasks[editingIndex].content = editContent;
			editingIndex = null;
			editContent = '';
		}
	}

	function cancelEditing(): void {
		editingIndex = null;
		editContent = '';
	}

	function handleKeyup(event: KeyboardEvent, isEdit?: boolean, isAdd?: boolean): void {
		if (event.key === 'Enter') {
			saveTask();
		} else if (event.key === 'Escape') {
			cancelEditing();
		}
	}
</script>

<section>
	<span class="flex justify-center items-center gap-x-2">
		<h2 class="text-xl p-1">Today</h2>
		<button
			type="button"
			class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-1 py-0 rounded-md w-6 h-6"
			on:click={toggleInput}
		>
			<div class="opacity-60">
				<i class="fa-solid fa-plus fa-md"></i>
			</div>
		</button>
	</span>

	<ul class="p-1">
		<!-- List -->
		{#each tasks as task, index}
			<li class="group flex justify-center items-center gap-x-2">
				{#if editingIndex === index}
					<!-- Edit -->
					<input
						type="text"
						bind:value={editContent}
						class="w-full bg-transparent border-none focus:border-none focus:ring-0 focus:outline-none focus:caret-blue-500 text-left overflow-auto"
						on:keyup={handleKeyup}
						bind:this={inputElement}
					/>
				{:else}
					<input
						type="checkbox"
						checked={task.completed}
						on:change={() => toggleTaskCompletion(index)}
					/>
					<span class={task.completed ? 'line-through' : ''}>{task.content}</span>
				{/if}
				{#if editingIndex !== index}
					<button class="hidden group-hover:block" on:click={() => startEditingTask(index)}>
						<i class="fa-regular fa-pen-to-square opacity-60"></i>
					</button>
				{/if}
			</li>
		{/each}
		<!-- Add -->
		{#if showInput}
			<li class="flex justify-center items-center">
				<input
					type="text"
					class="flex-grow bg-transparent border-none focus:border-none focus:ring-0 focus:outline-none focus:caret-blue-500 text-center"
					placeholder="Add new task"
					bind:value={newTask}
					on:keyup={(e) => e.key === 'Enter' && addTask()}
					bind:this={inputElement}
				/>
			</li>
		{/if}
	</ul>
</section>
