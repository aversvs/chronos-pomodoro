import styles from './styles.module.scss';

type DefaultButtonProps = {
	icon: React.ReactNode;
	color?: 'stateOne' | 'stateTwo';
} & React.ComponentProps<'button'>;

export function DefaultButton({ icon, color = 'stateTwo', ...props }: DefaultButtonProps) {
	return (
		<button className={`${styles.button} ${styles[color]}`} {...props}>
			{icon}
		</button>
	);
}
