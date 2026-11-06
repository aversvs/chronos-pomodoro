import ChronosLogo from '../../icons/chronos-logo.svg?react';
import styles from './styles.module.scss';
import { RouterLink } from '../RouterLink';


export function Logo() {
  return (
    <div>
      <RouterLink href="/" className={styles.logo}>
        <ChronosLogo aria-hidden='true' />
        <span>Chronos</span>
      </RouterLink>
    </div>
  );
}
