<script lang="ts">
	const WORK_TIME = 25 * 60;
	const FREE_TIME = 5 * 60;

	let timeLeft: number = WORK_TIME;
	let isRunning: boolean = false;
	let interval: number;

	function startTimer() {
		isRunning = true;
		interval = setInterval(() => {
			if (timeLeft > 0) {
				timeLeft--;
			} else {
				clearInterval(interval);
				isRunning = false;
				//Change notifier
			}
		}, 1000);
	}

	function stopTimer() {
		clearInterval(interval);
		isRunning = false;
	}

	function resetTimer() {
		timeLeft = WORK_TIME;
	}

	function formatTime(seconds: number): string {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	}
</script>

<!-- Timer -->
<div class="text-5xl font-bold flex justify-center p-10">
	<div>{formatTime(timeLeft)}</div>
</div>

<!-- Buttons-->
<div class="flex flex-row space-x-10">
	<button
		class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-md transition-colors duration-500 ease-in-out"
		on:click={startTimer}
	>
		Start
	</button>
	<button
		class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-md transition-colors duration-500 ease-in-out"
		on:click={stopTimer}
	>
		Stop
	</button>
	<button
		class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-md transition-colors duration-500 ease-in-out"
		on:click={resetTimer}
	>
		Reset
	</button>
</div>
