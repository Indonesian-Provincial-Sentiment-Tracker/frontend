import { useMemo } from 'react';
import styles from './DateDisplay.module.css';

export default function DateDisplay({ datas }: { datas: any }) {
  const formattedDate = useMemo(() => {
    const dateString = datas?.date;
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, [datas?.date]);

  return (
    <div className={styles.container}>
      <span className={styles.label}>Data per:</span>
      <span className={styles.date}>{formattedDate}</span>
    </div>
  );
}
