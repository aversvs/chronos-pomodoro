// Generic function to sort the tasks array
//
// The .sort() method takes a function that compares two items (a, b) and must return:
// - A NEGATIVE number (-1) if "a" should come before "b".
// - A POSITIVE number (1) if "a" should come after "b".
// - ZERO (0) if the order doesn't need to change.
//
// The function handles:
// 1. If the value is null, it moves it to the end of the list.
// 2. If it's a number, it sorts numerically (asc or desc).
// 3. If it's a string, it sorts alphabetically (asc or desc).
//
// The spread [...tasks] creates a copy of the original array so it isn't modified directly.

import type{ TaskModel } from '../models/TaskModel';

// Defines the parameters expected by the function
export type SortTasksOptions = {
  tasks: TaskModel[]; // List of tasks to be sorted
  direction?: 'asc' | 'desc'; // Sort direction: ascending or descending (optional)
  field?: keyof TaskModel; // Which task field is used for sorting (optional)
};

export function sortTasks({
  field = 'startDate', // If no field is given, use 'startDate' as the default
  direction = 'desc', // If no direction is given, use 'desc' (descending)
  tasks = [], // If no list is passed, use an empty list
}: SortTasksOptions): TaskModel[] {
  return [...tasks].sort((a, b) => {
    // Get the value of the chosen property (e.g. startDate) from each task
    const aValue = a[field];
    const bValue = b[field];

    // --- HANDLING NULL VALUES ---

    // If both are null, keep the current order
    if (aValue === null && bValue === null) return 0;

    // If only the first one is null, it goes to the end
    if (aValue === null) return 1;

    // If only the second one is null, it goes to the end
    if (bValue === null) return -1;

    // --- NUMERIC COMPARISON ---

    // If both values are numbers, subtract them to sort
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direction === 'asc'
        ? aValue - bValue // E.g. 1, 2, 3...
        : bValue - aValue; // E.g. 3, 2, 1...
    }

    // --- STRING COMPARISON ---

    // If both values are strings, use localeCompare to compare them alphabetically
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return direction === 'asc'
        ? aValue.localeCompare(bValue) // A -> Z
        : bValue.localeCompare(aValue); // Z -> A
    }

    // --- UNHANDLED CASES ---

    // If it's not a number, a string or null, don't change the order
    return 0;
  });
}
