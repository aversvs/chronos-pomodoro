import type { ToastContentProps } from 'react-toastify';
import { DefaultButton } from '../DefaultButton';
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';

import styles from './styles.module.scss';

export function Dialog({ closeToast, data }: ToastContentProps<string>) {
  return (
    <>
      <div className={styles.container}>
        <p>{data}</p>

        <div className={styles.buttonsContainer}>
          <DefaultButton
            onClick={() => closeToast(true)}
            icon={<ThumbsUpIcon />}
            color='stateOne'
            aria-label='Confirm action and close'
            title='Confirm action and close'
          />
          <DefaultButton
            onClick={() => closeToast(false)}
            icon={<ThumbsDownIcon />}
            color='stateTwo'
            aria-label='Cancel action and close'
            title='Cancel action and close'
          />
        </div>
      </div>
    </>
  );
}