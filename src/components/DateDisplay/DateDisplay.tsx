import { useMemo } from 'react';
import { useSentimentData } from '../../hooks/useSentimentData';
import styles from './DateDisplay.module.css';

export default function DateDisplay() {
  const data = useSentimentData();

  const formattedDate = useMemo(() => {
    const dateString = data?.date;
    if (!dateString) return 'N/A';

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'N/A';

      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return 'N/A';
    }
  }, [data?.date]);

  return (
    <div className={styles.container}>
      <span className={styles.label}>Data per:</span>
      <span className={styles.date}>{formattedDate}</span>
    </div>
  );
}
