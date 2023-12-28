<script>
	import Pomodoro from '../components/Pomodoro.svelte';
	import Todo from '../components/Todo.svelte';
</script>

<svelte:head>
	<title>To-Do</title>
	<meta name="description" content="To-Do List" />
</svelte:head>

<main>
	<article>
		<Pomodoro />
		<h1 class="text-3xl font-bold p-10">To-Do List</h1>
		<Todo />
	</article>
</main>

<style>
	h1 {
		font-family: 'Open Sans', sans-serif;
		font-weight: 700;
		width: 100%;
	}
</style>
