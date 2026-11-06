import { Container } from '../../components/Container';
import { CountDown } from '../../components/CountDown';
import { MainForm } from '../../components/MainForm';
import { MainTemplate } from '../../templates/MainTemplate';
import { useEffect } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';


export function Home() {
	const { state } = useTaskContext();

	useEffect(() => {
		if (state.activeTask) return;
		document.title = 'Chronos Pomodoro';
	}, [state.activeTask]);

	return (
		<MainTemplate>
			<Container>
				<CountDown />
			</Container>

			<Container>
				<MainForm />
			</Container>
		</MainTemplate>
	);
}
