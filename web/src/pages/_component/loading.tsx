import styles from './index.module.scss';

export default function Loading() {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.loader}>
        <div className={`${styles.loaderInner} ${styles.pacman}`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>

  );
}