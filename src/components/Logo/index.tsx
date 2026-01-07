import { Clock, Timer, TimerIcon } from "lucide-react";
import styles from "./styles.module.scss";


export function Logo() {
  return (
    <div>
      <a href="" className={styles.logo}>
        <Clock/>
        <span>Chronos</span>
      </a>
    </div>
  );
}
