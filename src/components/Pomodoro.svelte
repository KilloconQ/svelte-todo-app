<script lang="ts">
	const WORK_TIME = 25 * 60;
	const FREE_TIME = 5 * 60;

	let timeLeft: number = WORK_TIME;
	let isRunning: boolean = false;
	let interval: number;
	let isFreeTime: boolean = false;

	/**
	 * @description Starts the timer
	 */
	function startTimer() {
		isRunning = true;
		interval = setInterval(() => {
			if (timeLeft > 0) {
				timeLeft--;
			} else {
				clearInterval(interval);
				changeTime();
				//TODO: Change notifier
			}
		}, 1000);
	}

	/**
	 * @description Stops the timer
	 */
	function stopTimer() {
		clearInterval(interval);
		isRunning = false;
	}

	/**
	 * @description Resets the timer
	 */
	function resetTimer() {
		clearInterval(interval); // Asegúrate de limpiar el intervalo existente
		isRunning = false; // Actualiza el estado a no corriendo
		timeLeft = isFreeTime ? FREE_TIME : WORK_TIME;
	}

	/**
	 * @description Formats a number of seconds into a time string in the format "mm:ss"
	 * @param {number} seconds - The number of seconds to format
	 * @returns {string} - The formatted time string
	 */
	function formatTime(seconds: number): string {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	}

	/**
	 * Chnages between work time and free time
	 */
	function changeTime(): void {
		if (!isFreeTime) {
			isFreeTime = true;
			timeLeft = FREE_TIME;
		} else {
			isRunning = false;
			timeLeft = WORK_TIME;
			isFreeTime = false;
		}
	}
</script>

<!-- Timer -->
<section>
	<div class="text-5xl font-bold flex justify-center p-10">
		<div>{formatTime(timeLeft)}</div>
	</div>

	<!-- Buttons-->
	<div class="flex flex-row space-x-10">
		{#if !isRunning}
			<!-- content here -->
			<button
				class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-md transition-colors duration-500 ease-in-out"
				on:click={startTimer}
				disabled={isRunning}
			>
				Start
			</button>
		{/if}
		{#if isRunning}
			<button
				class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-md transition-colors duration-500 ease-in-out"
				on:click={stopTimer}
				disabled={!isRunning}
			>
				Stop
			</button>
		{/if}
		<button
			class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-md transition-colors duration-500 ease-in-out"
			on:click={resetTimer}
		>
			Reset
		</button>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
