import { useCallback, useState } from 'react';
import styles from './SentimentStats.module.css';
import Tooltip from '../ui/Card/Tooltip/Tooltip';

export default function SentimentStats({ datas }: { datas: any }) {
  const [showTooltip, setShowTooltip] = useState({
    positive: false,
    neutral: false,
    negative: false,
  });

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
          <div
            className={styles.score}
            onMouseEnter={() => setShowTooltip((prev) => ({ ...prev, positive: true }))}
            onMouseLeave={() => setShowTooltip((prev) => ({ ...prev, positive: false }))}
          >
            <span>Score: {formatScore(datas.sentiments.positive_score)}</span>
            <Tooltip showTooltip={showTooltip.positive} />
          </div>
        </div>
      </div>
      <div className={styles.statItem}>
        <span className={styles.label}>Neutral</span>
        <div className={styles.valueGroup}>
          <span className={styles.value}>
            {formatPercentage(datas.sentiments.neutral_percentage)}
          </span>
          <div
            className={styles.score}
            onMouseEnter={() => setShowTooltip((prev) => ({ ...prev, neutral: true }))}
            onMouseLeave={() => setShowTooltip((prev) => ({ ...prev, neutral: false }))}
          >
            <span>Score: {formatScore(datas.sentiments.neutral_score)}</span>
            <Tooltip showTooltip={showTooltip.neutral} />
          </div>
        </div>
      </div>
      <div className={styles.statItem}>
        <span className={styles.label}>Negative</span>
        <div className={styles.valueGroup}>
          <span className={styles.value}>
            {formatPercentage(datas.sentiments.negative_percentage)}
          </span>
          <div
            className={styles.score}
            onMouseEnter={() => setShowTooltip((prev) => ({ ...prev, negative: true }))}
            onMouseLeave={() => setShowTooltip((prev) => ({ ...prev, negative: false }))}
          >
            <span>Score: {formatScore(datas.sentiments.negative_score)}</span>
            <Tooltip showTooltip={showTooltip.negative} />
          </div>
        </div>
      </div>
    </div>
  );
}
