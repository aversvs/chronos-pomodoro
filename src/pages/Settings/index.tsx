import { RotateCcwIcon, SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { DefaultInput } from "../../components/Input";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";
import { useEffect, useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionsTypes } from "../../contexts/TaskContext/TaskActions";
import { initialTaskState } from "../../contexts/TaskContext/initialTaskState";

import styles from "./styles.module.scss";

export function Settings() {
	const { state, dispatch } = useTaskContext();

	useEffect(() => {
		if (state.activeTask) return;
		document.title = "Settings - Chronos Pomodoro";
	}, [state.activeTask]);

	const workTimeInput = useRef<HTMLInputElement>(null);
	const shortBreakTimeInput = useRef<HTMLInputElement>(null);
	const longBreakTimeInput = useRef<HTMLInputElement>(null);

	function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		showMessage.dismiss();

		const formErrors = [];

		const workTime = Number(workTimeInput.current?.value);
		const shortBreakTime = Number(shortBreakTimeInput.current?.value);
		const longBreakTime = Number(longBreakTimeInput.current?.value);

		if (![workTime, shortBreakTime, longBreakTime].every(Number.isInteger)) {
			formErrors.push("Enter only whole numbers in ALL fields");
		}

		if (workTime < 1 || workTime > 99) {
			formErrors.push("Enter a value between 1 and 99 for focus");
		}

		if (shortBreakTime < 1 || shortBreakTime > 30) {
			formErrors.push("Enter a value between 1 and 30 for short break");
		}

		if (longBreakTime < 1 || longBreakTime > 60) {
			formErrors.push("Enter a value between 1 and 60 for long break");
		}

		if (formErrors.length > 0) {
			formErrors.forEach((error) => {
				showMessage.error(error);
			});
			return;
		}

		dispatch({
			type: TaskActionsTypes.CHANGE_SETTINGS,
			payload: {
				workTime,
				shortBreakTime,
				longBreakTime,
			},
		});
		showMessage.success("Settings saved");
	}

	function handleResetSettings() {
		showMessage.dismiss();
		showMessage.confirm("Restore the default settings?", (confirmation) => {
			if (!confirmation) return;

			dispatch({
				type: TaskActionsTypes.CHANGE_SETTINGS,
				payload: { ...initialTaskState.config },
			});
			showMessage.success("Settings restored");
		});
	}

	return (
		<MainTemplate>
			<Container>
				<Heading>Settings</Heading>
			</Container>

			<Container>
				<p className={styles.description}>Change the settings for focus time, short break and long break.</p>
			</Container>

			<Container>
				<form key={JSON.stringify(state.config)} onSubmit={handleSaveSettings} className={`form ${styles.settingsForm}`}>
					<div className="formRow">
						<DefaultInput id="workTime" labelText="Focus" ref={workTimeInput} defaultValue={state.config.workTime} type="number" min={1} max={99} required />
					</div>
					<div className="formRow">
						<DefaultInput id="shortBreakTime" labelText="Short break" ref={shortBreakTimeInput} defaultValue={state.config.shortBreakTime} type="number" min={1} max={30} required />
					</div>
					<div className="formRow">
						<DefaultInput id="longBreakTime" labelText="Long break" ref={longBreakTimeInput} defaultValue={state.config.longBreakTime} type="number" min={1} max={60} required />
					</div>
					<div className="formRow">
						<DefaultButton icon={<SaveIcon />} color="stateOne" aria-label="Save settings" title="Save settings" />
						<button type="button" className="textButton" onClick={handleResetSettings}>
							<RotateCcwIcon aria-hidden="true" />
							Restore defaults
						</button>
					</div>
				</form>
			</Container>
		</MainTemplate>
	);
}
