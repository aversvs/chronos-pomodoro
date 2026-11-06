import { Container } from '../../components/Container';
import { GenericHtml } from '../../components/GenericHtml';
import { Heading } from '../../components/Heading';
import { RouterLink } from '../../components/RouterLink';
import { MainTemplate } from '../../templates/MainTemplate';
import { useEffect } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

export function AboutPomodoro() {
	const { state } = useTaskContext();

	useEffect(() => {
		if (state.activeTask) return;
		document.title = 'Understand the Pomodoro Technique - Chronos Pomodoro';
	}, [state.activeTask]);

	return (
		<MainTemplate>
			<Container>
				<GenericHtml>
					<Heading>The Pomodoro Technique 🍅</Heading>
					<p>
						The Pomodoro Technique is a productivity methodology created by <strong>Francesco Cirillo</strong>, which consists of dividing work into time blocks (the famous "Pomodoros") interspersed with breaks. The goal is to maintain full focus for a short period and ensure rest to avoid mental fatigue.
					</p>
					<h2>How does the traditional Pomodoro work?</h2>
					<ul>
						<li>
							<strong>1. Define a task</strong> you want to accomplish.
						</li>
						<li>
							<strong>2. Work on it for 25 minutes</strong> without interruptions.
						</li>
						<li>
							<strong>3. Take a short 5-minute break</strong>.
						</li>
						<li>
							<strong>4. Every 4 cycles, take a long break</strong> (usually 15 to 30 minutes).
						</li>
					</ul>
					<h2>
						But <strong>Chronos Pomodoro</strong> has a difference 🚀
					</h2>
					<p>Our app follows the original concept, but with some improvements and customizations to make the process even more efficient:</p>
					<h3>⚙️ Time customization</h3>
					<p>
						You can configure the focus time, short break, and long break however you like! Just go to the{" "}
						<RouterLink href="/settings" data-discover="true">
							settings page
						</RouterLink>{" "}
						and adjust the minutes as you prefer.
					</p>
					<h3>🔁 Cycles organized in sequence</h3>
					<p>Each time a cycle is completed, a new task is automatically added to your history, and the app already suggests the next cycle (focus or break).</p>
					<p>
						<strong>Our default:</strong>
					</p>
					<ul>
						<li>
							<strong>Odd</strong> cycles: Work (focus).
						</li>
						<li>
							<strong>Even</strong> cycles: Short break.
						</li>
						<li>
							Cycle <strong>8</strong>: Special long break, to reset the full cycle.
						</li>
					</ul>
					<h3>🍅 Cycle visualization</h3>
					<p>Just below the timer, you will see colored dots representing the cycles:</p>
					<ul>
						<li>🟡 Yellow: Work cycle (focus).</li>
						<li>🟢 Green: Short break.</li>
						<li>🔵 Blue: Long break (appears every 8 cycles).</li>
					</ul>
					<p>This way, you always know where you are in the process and what comes next. No more jotting things down on paper or doing mental math!</p>
					<h3>📊 Automatic history</h3>
					<p>
						All your completed tasks and cycles are saved in the{" "}
						<RouterLink href="/history" data-discover="true">
							history
						</RouterLink>
						, with status of completed or interrupted. This way, you can track your progress over time.
					</p>
					<h2>Why use Chronos Pomodoro?</h2>
					<ul>
						<li>✅ Organize your focus with clarity.</li>
						<li>✅ Work and rest in the right measure.</li>
						<li>✅ Customize your own cycles and times.</li>
						<li>✅ Track your history automatically.</li>
					</ul>
					<p>
						<strong>Ready to focus?</strong> Let's go{" "}
						<RouterLink href="/" data-discover="true">
							back to the home page
						</RouterLink>{" "}
						and start your Pomodoros! 🍅🚀
					</p>
					<p>
						<em>"Full focus, no rush, no pause, just go!"</em> 💪🧘‍♂️
					</p>
				</GenericHtml>
			</Container>
		</MainTemplate>
	);
}
