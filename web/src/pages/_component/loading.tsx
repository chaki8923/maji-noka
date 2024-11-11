import styles from './index.module.scss';

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loading}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>

  );
}