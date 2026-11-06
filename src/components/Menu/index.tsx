import { HistoryIcon, HomeIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import { RouterLink } from '../RouterLink';

type AvailableThemes = 'dark' | 'light';


export function Menu() {
	const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme = localStorage.getItem('theme') as AvailableThemes || 'dark';
    return storageTheme;
  });

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />
  }

	function handleThemeChange(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
		event.preventDefault();

		setTheme((prevTheme) => {
			const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
			return nextTheme;
		});
	}

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
	}, [theme]);

	return (
		<nav>
			<ul className={styles.menu}>
				<li>
					<RouterLink href="/" title="Go to the Home page" aria-label="Go to the Home page">
						<HomeIcon />
					</RouterLink>
				</li>
				<li>
					<RouterLink href="/history" title="View History" aria-label="View History">
						<HistoryIcon />
					</RouterLink>
				</li>
				<li>
					<RouterLink href="/settings" title="Open Settings" aria-label="Open Settings">
						<SettingsIcon />
					</RouterLink>
				</li>
				<li>
					<a href="#" title="Change Theme" aria-label="Change Theme" onClick={handleThemeChange}>
						{nextThemeIcon[theme]}
					</a>
				</li>
			</ul>
		</nav>
	);
}
