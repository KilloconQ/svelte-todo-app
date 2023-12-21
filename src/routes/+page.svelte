<script>
	import Counter from './Counter.svelte';
</script>

<svelte:head>
	<title>To-Do</title>
	<meta name="description" content="To-Do List" />
</svelte:head>

<section>
	<h1 class="text-3xl font-bold underline">
		To-Do List
	</h1>

	<Counter />
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
