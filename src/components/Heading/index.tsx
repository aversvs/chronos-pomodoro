import styles from './styles.module.scss'

type HeadingProps = {
    children: React.ReactNode;      
}

export function Heading( { children } : HeadingProps){
    return <h1 className={styles.title}>{children}</h1>
}