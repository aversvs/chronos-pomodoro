import styles from './styles.module.scss'


export function Footer(){
    return <footer className={styles.footer}>
        <a href="">How the Pomodoro Technique works?</a>
		<span>Chronos Pomodoro © {new Date() .getFullYear()}</span>
    </footer>;
}