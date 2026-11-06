import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";

import styles from "./styles.module.scss";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import type { TaskModel } from "../../models/TaskModel";
import { sortTasks, type SortTasksOptions } from "../../utils/sortTasks";
import { useEffect, useState } from "react";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionsTypes } from "../../contexts/TaskContext/TaskActions";

const taskTypeDictionary: Record<TaskModel["type"], string> = {
	workTime: "Focus",
	shortBreakTime: "Short break",
	longBreakTime: "Long break",
};

export function History() {
	const { state, dispatch } = useTaskContext();

	useEffect(() => {
		if (state.activeTask) return;
		document.title = "History - Chronos Pomodoro";
	}, [state.activeTask]);

	const hasTasks = state.tasks.length > 0;

	const [sortOptions, setSortOptions] = useState<Omit<SortTasksOptions, "tasks">>({
		field: "startDate",
		direction: "desc",
	});

	const sortedTasks = sortTasks({ tasks: state.tasks, ...sortOptions });

	function handleSortTasks({ field }: Pick<SortTasksOptions, "field">) {
		const isSameField = sortOptions.field === field;
		const newDirection = isSameField && sortOptions.direction === "desc" ? "asc" : "desc";

		setSortOptions({ field, direction: newDirection });
	}

	function handleResetHistory() {
		showMessage.dismiss();
		showMessage.confirm("Are you sure you want to delete the history?", (confirmation) => {
			if (!confirmation) return;
			dispatch({ type: TaskActionsTypes.RESET_STATE });
		});
	}

	function renderSortIcon(field: SortTasksOptions["field"]) {
		if (sortOptions.field !== field) return <ArrowUpDownIcon />;
		return sortOptions.direction === "asc" ? <ArrowUpIcon /> : <ArrowDownIcon />;
	}

	return (
		<MainTemplate>
			<Container>
				<Heading>
					<span>History</span>
					{hasTasks && (
						<span className={styles.buttonContainer}>
							<DefaultButton icon={<TrashIcon />} color="stateTwo" aria-label="Delete all history" title="Delete history" onClick={handleResetHistory} />
						</span>
					)}
				</Heading>
			</Container>

			<Container>
				{hasTasks && (
					<div className={styles.responsiveTable}>
						<table>
							<thead>
								<tr>
									<th onClick={() => handleSortTasks({ field: "name" })} className={styles.thSort}>
										<span className={styles.thSortContent}>Task {renderSortIcon("name")}</span>
									</th>
									<th onClick={() => handleSortTasks({ field: "duration" })} className={styles.thSort}>
										<span className={styles.thSortContent}>Duration {renderSortIcon("duration")}</span>
									</th>
									<th onClick={() => handleSortTasks({ field: "startDate" })} className={styles.thSort}>
										<span className={styles.thSortContent}>Date {renderSortIcon("startDate")}</span>
									</th>
									<th>Status</th>
									<th>Type</th>
								</tr>
							</thead>

							<tbody>
								{sortedTasks.map((task) => {
									return (
										<tr key={task.id}>
											<td>{task.name}</td>
											<td>{task.duration} min</td>
											<td>{formatDate(task.startDate)}</td>
											<td>{getTaskStatus(task, state.activeTask)}</td>
											<td>{taskTypeDictionary[task.type]}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}
				{!hasTasks && <p className={styles.emptyMessage}>No tasks have been created yet.</p>}
			</Container>
		</MainTemplate>
	);
}
