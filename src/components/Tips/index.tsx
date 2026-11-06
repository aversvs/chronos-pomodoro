import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { formatMinutes } from "../../utils/formatMinutes";

export function Tips() {
	const { state } = useTaskContext();
	const nextCycle = getNextCycle(state.currentCycle);
	const nextCycleType = getNextCycleType(nextCycle);

	const tipsForWhenActiveTask = {
		workTime: <span>Focus for {formatMinutes(state.config.workTime)}</span>,
		shortBreakTime: <span>Rest for {formatMinutes(state.config.shortBreakTime)}</span>,
		longBreakTime: <span>Rest for {formatMinutes(state.config.longBreakTime)}</span>,
	};

	const tipsForNoWhenActiveTask = {
		workTime: (
			<span>
				Next <strong>cycle</strong> is {formatMinutes(state.config.workTime)}
			</span>
		),
		shortBreakTime: (
			<span>
				Next <strong>rest</strong> is {formatMinutes(state.config.shortBreakTime)}
			</span>
		),
		longBreakTime: (
			<span>
				Next <strong>rest</strong> is {formatMinutes(state.config.longBreakTime)}
			</span>
		),
	};

	return (
		<>
			{!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
			{!state.activeTask && tipsForNoWhenActiveTask[nextCycleType]}
		</>
	);
}
