import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Container } from "./components/Container";
import { CountDown } from "./components/CountDown";
import { Cycles } from "./components/Cycles";
import { DefaultButton } from "./components/DefaultButton";
import { DefaultInput } from "./components/Input";
import { Logo } from "./components/Logo";
import { Menu } from "./components/Menu";
import "./styles/global.scss";
import { Footer } from "./components/Footer";

export function App() {
	return (
		<>
			<Container>
				<Logo />
			</Container>

			<Container>
				<Menu />
			</Container>

			<Container>
				<CountDown />
			</Container>

			<Container>
				<form action="" className="form">
					<div className="formRow">
						<DefaultInput labelText="Task" id="countDown" type="text" placeholder="enter something" />
					</div>
					<div className="formRow">
						<p>Lorem ipsum dolor sit amet.</p>
					</div>
					<div className="formRow">
						<Cycles />
					</div>
					<div className="formRow">
						<DefaultButton icon={<PlayCircleIcon />} color="stateOne" />
						{/* <DefaultButton icon={ <StopCircleIcon /> } color="stateTwo"/> */}
					</div>
				</form>
			</Container>

			<Container>
				<Footer />
			</Container>
		</>
	);
}
