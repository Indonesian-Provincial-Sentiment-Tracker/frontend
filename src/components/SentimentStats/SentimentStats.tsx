import { useCallback } from 'react';
import styles from './SentimentStats.module.css';

export default function SentimentStats({ datas }: { datas: any }) {
  const formatPercentage = useCallback((value: number | null | undefined) => {
    if (value == null || isNaN(value)) return 'N/A';
    return `${value.toFixed(1)}%`;
  }, []);

  const formatScore = useCallback((value: number | null | undefined) => {
    if (value == null || isNaN(value)) return 'N/A';
    return value.toFixed(2);
  }, []);

  if (!datas || !datas.sentiments) {
    return (
      <div className={styles.container}>
        <div className={styles.noData}>Tidak ada data sentimen</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.statItem}>
        <span className={styles.label}>Positive</span>
        <div className={styles.valueGroup}>
          <span className={styles.value}>
            {formatPercentage(datas.sentiments.positive_percentage)}
          </span>
          <span className={styles.score}>
            Score: {formatScore(datas.sentiments.positive_score)}
          </span>
        </div>
      </div>
      <div className={styles.statItem}>
        <span className={styles.label}>Neutral</span>
        <div className={styles.valueGroup}>
          <span className={styles.value}>
            {formatPercentage(datas.sentiments.neutral_percentage)}
          </span>
          <span className={styles.score}>Score: {formatScore(datas.sentiments.neutral_score)}</span>
        </div>
      </div>
      <div className={styles.statItem}>
        <span className={styles.label}>Negative</span>
        <div className={styles.valueGroup}>
          <span className={styles.value}>
            {formatPercentage(datas.sentiments.negative_percentage)}
          </span>
          <span className={styles.score}>
            Score: {formatScore(datas.sentiments.negative_score)}
          </span>
        </div>
      </div>
    </div>
  );
}
