let isRunning = false;

self.onmessage = function (event) {
	if (isRunning) return;

	isRunning = true;

	const state = event.data;
	const { activeTask, secondsRemaining } = state;
	const endDate = activeTask.startDate + secondsRemaining * 1000;

	function tick() {
		const msRemaining = endDate - Date.now();

		self.postMessage(Math.ceil(msRemaining / 1000));

		if (msRemaining <= 0) return;

		setTimeout(tick, msRemaining % 1000 || 1000);
	}

	tick();
};
