<script>
	import Pomodoro from './Pomodoro.svelte';
</script>

<svelte:head>
	<title>To-Do</title>
	<meta name="description" content="To-Do List" />
</svelte:head>

<section>
<!-- Todo add pomodoro  -->
	<main>
		<Pomodoro />
	</main>
	<h1 class="text-3xl font-bold p-10">
		To-Do List
	</h1>

</section>

<style>

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		font-family: 'Open Sans', sans-serif;
		font-weight: 700;
		width: 100%;
	}

</style>
