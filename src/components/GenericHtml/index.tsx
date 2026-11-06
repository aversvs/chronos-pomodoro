import styles from './styles.module.scss';

type GerericHtmlProps = {
    children: React.ReactNode
}

export function GenericHtml({ children }: GerericHtmlProps) {
	return <div className={styles.genericHtml}>{children}</div>;
}
