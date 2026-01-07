import styles from "./styles.module.scss"

export function Cycles(){
    return(
        <div className={styles.cycles}>
            <span>Cycles</span>
            <div className={styles.cycleDots}>
                <span></span>
            </div>
        </div>
    )
}