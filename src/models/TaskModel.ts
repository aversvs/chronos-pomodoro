import type { TaskStateModel } from './TaskStateModel';

export type TaskModel = {
    id: string;
    name: string;
    duration: number;
    startDate: number;
    completeDate: number | null; // when the timer completes
    interruptDate:  number | null; // when the task is interrupted
    type: keyof TaskStateModel['config'];
}