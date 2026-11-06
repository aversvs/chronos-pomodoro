import { RotateCcwIcon } from "lucide-react";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionsTypes } from "../../contexts/TaskContext/TaskActions";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import styles from "./styles.module.scss";

const TOTAL_CYCLES = 8;
const TOTAL_POMODOROS = TOTAL_CYCLES / 2;

export function Cycles() {
	const { state, dispatch } = useTaskContext();

	const isRunning = state.activeTask !== null;
	const focusCycle = isRunning ? state.currentCycle : getNextCycle(state.currentCycle);
	const pomodoroNumber = Math.ceil(focusCycle / 2);

	const steps = Array.from({ length: TOTAL_CYCLES }, (_, index) => index + 1);

	function getStepStatusClass(step: number) {
		if (step < focusCycle) return styles.done;
		if (step > focusCycle) return "";
		return isRunning ? styles.inProgress : styles.next;
	}

	function handleResetCycles() {
		showMessage.dismiss();
		showMessage.confirm("Restart the cycles from the beginning?", (confirmation) => {
			if (!confirmation) return;

			dispatch({ type: TaskActionsTypes.RESET_CYCLES });
			showMessage.success("Cycles restarted");
		});
	}

	return (
		<div className={styles.cycles}>
			<span className="subTitle">Cycles</span>

			<ol className={styles.track} aria-hidden="true">
				{steps.map((step) => (
					<li key={step} className={`${styles.step} ${styles[getNextCycleType(step)]} ${getStepStatusClass(step)}`} />
				))}
			</ol>

			<p className={styles.label}>
				Pomodoro {pomodoroNumber} of {TOTAL_POMODOROS}
			</p>

			{!isRunning && (
				<button type="button" className="textButton" onClick={handleResetCycles}>
					<RotateCcwIcon aria-hidden="true" />
					Restart cycles
				</button>
			)}
		</div>
	);
}
