import { Container } from "../../components/Container";
import { GenericHtml } from "../../components/GenericHtml";
import { Heading } from "../../components/Heading";
import { RouterLink } from "../../components/RouterLink";
import { MainTemplate } from "../../templates/MainTemplate";
import { useEffect } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";

export function NotFound() {
	const { state } = useTaskContext();

	useEffect(() => {
		if (state.activeTask) return;
		document.title = "Page not found - Chronos Pomodoro";
	}, [state.activeTask]);

	return (
		<MainTemplate>
			<Container>
				<GenericHtml>
					<Heading>404 - Page Not Found 🚀</Heading>

					<p>Oops! It looks like the page you're trying to access doesn't exist. Maybe it went on vacation, decided to explore the universe, or got lost somewhere between two black holes. 🌌</p>

					<p>
						But don’t worry — you’re not lost in space (yet). You can safely head back to the <RouterLink href="/">homepage</RouterLink> or the 
						<RouterLink href="/history" data-discover="true"> history page </RouterLink> or stay here and pretend you’ve discovered a secret page only the coolest explorers can access. 🧭✨
					</p>

					<p>If you think this page should exist (or if you’d like to chat about time travel and wormholes), feel free to get in touch. Otherwise, use the menu to return to the real world.</p>

					<p>
						Meanwhile, here’s something to think about: <br />
						"If a page doesn’t exist on the internet, did it ever really exist?" 🤔💭
					</p>
				</GenericHtml>
			</Container>
		</MainTemplate>
	);
}
