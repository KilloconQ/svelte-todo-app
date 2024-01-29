<script lang="ts">
	import { Task } from '../models/task';

	let editContent: string = '';
	let editingIndex: string | number | null = null;
	let inputElement: HTMLInputElement;
	let newTask: string = '';
	let showInput: boolean = false;
	let tasks: Task[] = [];

	$: if (showInput || editingIndex !== null) {
		inputElement && setTimeout(() => inputElement.focus(), 0);
	}

	$: orderedTasks = [...tasks].sort((a, b) => {
		return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
	});

	function toggleInput(): void {
		showInput = !showInput;
	}

	function addTask() {
		if (newTask.trim() === '') {
			alert('Please, write a new task.');
			return;
		}

		const dueDateRegex = /:(\d{2})-(\d{2})-(\d{4})/;

		let dueDate;

		// Procesa la fecha de vencimiento
		const dueDateMatch = newTask.match(dueDateRegex);
		if (dueDateMatch) {
			const [day, month, year] = dueDateMatch.slice(1).map(Number);
			dueDate = new Date(year, month - 1, day);
			newTask = newTask.replace(dueDateRegex, ''); // Remueve la fecha del contenido de la tarea
		}

		// Procesa la dificultad
		const newTaskObject = new Task();
		newTaskObject.id = Date.now();
		newTaskObject.content = newTask.trim();
		newTaskObject.completed = false;
		newTaskObject.dueDate = dueDateMatch ? dueDate : undefined; // Asigna la fecha de vencimiento

		tasks = [...tasks, newTaskObject];
		newTask = '';
		showInput = false;
	}

	function startEditingTask(taskId: number): void {
		const taskToEdit = tasks.find((task) => task.id === taskId);
		if (taskToEdit) {
			editingIndex = taskId;
			editContent = taskToEdit.content ?? '';
			if (taskToEdit.dueDate) {
				const dueDateStr = formatDate(taskToEdit.dueDate);
				editContent += ` :${dueDateStr}`;
			}
			showInput = false;
		}
	}

	function toggleTaskCompletion(taskId: number): void {
		let updatedTasks = tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));

		// Reordenamiento de las tareas
		let completedTasks = updatedTasks.filter((t) => t.completed);
		let activeTasks = updatedTasks.filter((t) => !t.completed);
		tasks = [...activeTasks, ...completedTasks];
	}

	function saveTask() {
		if (editContent.trim() === '') {
			alert('Please, write something for the task');
			return;
		}

		const dueDateRegex = /:(\d{2})-(\d{2})-(\d{4})$/;

		let dueDate: Date;

		const dueDateMatch = editContent.match(dueDateRegex);
		if (dueDateMatch) {
			const [day, month, year] = dueDateMatch.slice(1).map(Number);
			dueDate = new Date(year, month - 1, day);
			editContent = editContent.replace(dueDateRegex, ''); // Remueve la fecha del contenido de la tarea
		}

		// Encuentra la tarea que está siendo editada y actualiza sus propiedades
		tasks = tasks.map((t) => {
			if (t.id === editingIndex) {
				return {
					...t,
					content: editContent.trim(),
					dueDate: dueDateMatch ? dueDate : undefined // Actualiza o borra la fecha de vencimiento
				};
			}
			return t;
		});

		// Restablece las variables de edición
		editingIndex = null;
		editContent = '';
	}

	function cancelEditing(): void {
		editingIndex = null;
		editContent = '';
	}

	function handleKeyup(event: KeyboardEvent): void {
		if (event.key === 'Enter') {
			if (editingIndex !== null) {
				saveTask();
			} else if (showInput) {
				addTask();
			}
		} else if (event.key === 'Escape') {
			if (editingIndex !== null) {
				cancelEditing();
			} else if (showInput) {
				showInput = false;
				newTask = ''; // Limpiamos el input si se cancela.
			}
		}
	}

	function toggleHighlightTask(taskId: number): void {
		tasks = tasks.map((task) => {
			if (task.id === taskId && !task.completed) {
				return { ...task, isHighlighted: !task.isHighlighted };
			}
			return task;
		});
	}

	function formatDate(date: Date): String {
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}-${month}-${year}`;
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

	<section class="flex flex-col items-center">
		<div class="w-full max-w-md p-4 border rounded shadow">
			<!-- Contenedor de tareas -->
			<ul>
				{#each orderedTasks as task (task.id)}
					<li
						class="group p-2 hover:bg-gray-100 rounded {task.isHighlighted && !task.completed
							? 'bg-gray-200 shadow'
							: ''}"
					>
						{#if editingIndex === task.id}
							<!-- Edit -->
							<input
								type="text"
								bind:value={editContent}
								class="w-full bg-transparent border-b border-gray-300 focus:ring-0 focus:outline-none"
								on:keyup={handleKeyup}
								bind:this={inputElement}
							/>
						{:else}
							<!-- Contenido interactivo para tareas no completadas -->
							<div class="flex items-center justify-between break-word w-full">
								<!-- Parte interactiva para destacar la tarea -->
								<div
									class="flex items-center flex-grow"
									role="button"
									tabindex="0"
									on:click={() =>
										!task.completed && task.id !== undefined && toggleHighlightTask(task.id)}
									on:keyup={(event) =>
										event.key === 'Enter' &&
										!task.completed &&
										task.id !== undefined &&
										toggleHighlightTask(task.id)}
								>
									<input
										type="checkbox"
										checked={task.completed}
										on:change={() => task.id !== undefined && toggleTaskCompletion(task.id)}
										class="w-4 h-4 mr-2"
									/>
									<span class={task.completed ? 'line-through opacity-40 flex-grow' : 'flex-grow'}>
										{task.content}
									</span>
								</div>
								<!-- Botón de editar fuera del div interactivo -->
								{#if editingIndex !== task.id}
									<button
										class="opacity-0 group-hover:opacity-100 focus:opacity-100"
										on:click={(event) => {
											event.stopPropagation();
											task.id !== undefined && startEditingTask(task.id);
										}}
									>
										<i class="fa-regular fa-pen-to-square"></i>
									</button>
								{/if}
								<!-- Due date -->
								<div class="ml-2 flex items-center">
									{#if task.dueDate}
										<span class="italic text-sm text-gray-600 mr-2">
											{task.dueDate.toLocaleDateString()}
										</span>
									{/if}
								</div>
							</div>
						{/if}
					</li>
				{/each}
				<!-- Add -->
				{#if showInput}
					<li class="flex items-center p-2 rounded">
						<input
							type="text"
							class="flex-grow bg-transparent focus:ring-0 focus:outline-none"
							placeholder="Add new task"
							bind:value={newTask}
							on:keyup={handleKeyup}
							bind:this={inputElement}
						/>
					</li>
				{/if}
			</ul>
		</div>
	</section>
</section>
