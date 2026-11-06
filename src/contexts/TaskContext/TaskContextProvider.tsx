import { useEffect, useReducer, useRef } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContent";
import { TaskReducer } from "./TaskReducer";
import { TimerWorkerManager } from "../../workers/timeWorkerManager";
import { TaskActionsTypes } from "./TaskActions";
import { loadBeep } from "../../utils/loadBeep";
import type { TaskStateModel } from "../../models/TaskStateModel";

type TaskContextProviderProps = {
	children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
	const [state, dispatch] = useReducer(TaskReducer, initialTaskState, () => {
		const storageState = localStorage.getItem('state') || null;

		if (storageState === null) return initialTaskState;

		let parsedStorageState: TaskStateModel;

		try {
			parsedStorageState = JSON.parse(storageState) as TaskStateModel;
		} catch {
			return initialTaskState;
		}

		if (!Array.isArray(parsedStorageState?.tasks) || !parsedStorageState.config) return initialTaskState;

		return {
			...parsedStorageState,
			activeTask: null,
			secondsRemaining: 0,
			formattedSecondsRemaining: '00:00',
		};
	});

	const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

	const worker = TimerWorkerManager.getInstance();

	useEffect(() => {
		worker.onmessage((e) => {
			const countDownSeconds = e.data;

			if (countDownSeconds <= 0) {
				playBeepRef.current?.();
				playBeepRef.current = null;
				dispatch({
					type: TaskActionsTypes.COMPLETE_TASK,
				});
			} else {
				dispatch({
					type: TaskActionsTypes.COUNT_DOWN,
					payload: { secondsRemaining: countDownSeconds },
				});
			}
		});
	}, [worker]);

	useEffect(() => {
		localStorage.setItem("state", JSON.stringify(state));

		if (!state.activeTask) {
			worker.terminate();
			return;
		}

		document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;

		worker.postMessage(state);
	}, [worker, state]);

	useEffect(() => {
		if (state.activeTask && playBeepRef.current === null) {
			playBeepRef.current = loadBeep();
		} else {
			playBeepRef.current = null;
		}
	}, [state.activeTask]);

	return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>;
}
