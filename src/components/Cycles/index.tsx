import styles from "./styles.module.scss"

export function Cycles(){
    return(
        <div className={styles.cycles}>
            <span className="subTitle">Cycles</span>
            <div className={styles.cycleDots}>
                <span className={styles.workTime}></span>
                <span className={styles.shortBreakTime}></span>
                <span className={styles.workTime}></span>
                <span className={styles.shortBreakTime}></span>
                <span className={styles.workTime}></span>
                <span className={styles.shortBreakTime}></span>
                <span className={styles.workTime}></span>
                <span className={styles.longBreakTime}></span>
            </div>
        </div>
    )
}