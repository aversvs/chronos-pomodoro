import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../Input";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { TaskActionsTypes } from "../../contexts/TaskContext/TaskActions";
import { Tips } from "../Tips";
import { showMessage } from "../../adapters/showMessage";

export function MainForm() {
	const { state, dispatch } = useTaskContext();
	const taskNameInput = useRef<HTMLInputElement>(null);
	const lastTaskName = state.tasks[state.tasks.length  - 1]?.name || '';

	const nextCycle = getNextCycle(state.currentCycle);
	const nextCycleType = getNextCycleType(nextCycle);

	function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		showMessage.dismiss();

		if (taskNameInput.current === null) return;
		const taskName = taskNameInput.current.value.trim();

		if (!taskName) {
			showMessage.warning("Enter the task name!");
			return;
		}

		const newTask: TaskModel = {
			id: Date.now().toString(),
			name: taskName,
			startDate: Date.now(),
			completeDate: null,
			interruptDate: null,
			duration: state.config[nextCycleType],
			type: nextCycleType,
		};

		dispatch({ type: TaskActionsTypes.START_TASK, payload: newTask });

		showMessage.success("Task started!");
	}

	function handleInterruptTask() {
		showMessage.dismiss();
		showMessage.error("Task interrupted!");
		dispatch({ type: TaskActionsTypes.INTERRUPT_TASK });
	}

	return (
		<form onSubmit={handleCreateNewTask} action="" className="form">
			<div className="formRow">
				<DefaultInput labelText="Task" id="countDown" type="text" placeholder="enter something"  ref={taskNameInput} disabled={!!state.activeTask} defaultValue={lastTaskName}/>
			</div>
			<div className="formRow">
				<Tips />
			</div>
			<div className="formRow">
				{!state.activeTask && <DefaultButton aria-label="Start a new task" title="Start a new task" type="submit" icon={<PlayCircleIcon />} color="stateOne" />}
				{!!state.activeTask && <DefaultButton aria-label="Stop the current task" title="Stop the current task" type="button" icon={<StopCircleIcon />} color="stateTwo" onClick={handleInterruptTask} />}
			</div>
			{state.currentCycle > 0 && (
				<div className="formRow">
					<Cycles />
				</div>
			)}
		</form>
	);
}
