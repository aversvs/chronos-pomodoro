import { RouterLink } from '../RouterLink';

import styles from './styles.module.scss'


export function Footer(){
    return <footer className={styles.footer}>
        <RouterLink href='/about-pomodoro'>How the Pomodoro Technique works?</RouterLink>
        <span>Chronos Pomodoro © {new Date() .getFullYear()}</span>
    </footer>;
}