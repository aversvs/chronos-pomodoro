import type { TaskModel } from '../../models/TaskModel';
import type { TaskStateModel } from '../../models/TaskStateModel';

export const TaskActionsTypes = {
	START_TASK: 'START_TASK',
	INTERRUPT_TASK: 'INTERRUPT_TASK',
	RESET_STATE: 'RESET_STATE',
	COUNT_DOWN: 'COUNT_DOWN',
	COMPLETE_TASK: 'COMPLETE_TASK',
	CHANGE_SETTINGS: 'CHANGE_SETTINGS',
	RESET_CYCLES: 'RESET_CYCLES',
} as const;

export type TaskActionWithPayLoad =
	| {
			type: typeof TaskActionsTypes.START_TASK;
			payload: TaskModel;
	  }
	| {
			type: typeof TaskActionsTypes.COUNT_DOWN;
			payload: { secondsRemaining: number };
	  }
	| {
			type: typeof TaskActionsTypes.CHANGE_SETTINGS;
			payload: TaskStateModel['config'];
	  };

export type TaskActionWithoutPayLoad =
	| {
			type: typeof TaskActionsTypes.RESET_STATE;
	  }
	| {
			type: typeof TaskActionsTypes.INTERRUPT_TASK;
	  }
	| {
			type: typeof TaskActionsTypes.COMPLETE_TASK;
	  }
	| {
			type: typeof TaskActionsTypes.RESET_CYCLES;
	  };

export type TaskActionModel =
	| TaskActionWithPayLoad
	| TaskActionWithoutPayLoad;