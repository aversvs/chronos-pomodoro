import { HistoryIcon, HomeIcon, SettingsIcon, SunIcon } from "lucide-react";
import styles from "./styles.module.scss";
import { useState, useEffect } from "react";

type AvailableThemes = "dark" | "light";


export function Menu() {
	const [theme, setTheme] = useState<AvailableThemes>("dark");

	function handleThemeChange(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
		event.preventDefault();

		setTheme((prevTheme) => {
			const nextTheme = prevTheme === "dark" ? "light" : "dark";
			return nextTheme;
		});
	}

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	return (
		<nav>
			<ul className={styles.menu}>
				<li>
					<a href="" title="Go to the Home page" aria-label="Go to the Home page">
						<HomeIcon />
					</a>
				</li>
				<li>
					<a href="" title="View History" aria-label="View History">
						<HistoryIcon />
					</a>
				</li>
				<li>
					<a href="" title="Open Settings" aria-label="Open Settings">
						<SettingsIcon />
					</a>
				</li>
				<li>
					<a href="#" title="Change Theme" aria-label="Change Theme" onClick={handleThemeChange}>
						<SunIcon />
					</a>
				</li>
			</ul>
		</nav>
	);
}
