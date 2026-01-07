import { HistoryIcon, HomeIcon, SettingsIcon, SunIcon } from "lucide-react";
import styles from "./styles.module.scss";

export function Menu() {
  return (
    <div>
      <nav>
        <ul className={styles.menu}>
          <li>
            <a href="" aria-label="Go to the Home page">
              <HomeIcon />
            </a>
          </li>
          <li>
            <a href="" aria-label="View History">
              <HistoryIcon />
            </a>
          </li>
          <li>
            <a href="" aria-label="Open Settings">
              <SettingsIcon />
            </a>
          </li>
          <li>
            <a href="" aria-label="Change Theme">
              <SunIcon />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
