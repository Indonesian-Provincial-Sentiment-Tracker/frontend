import { GrCircleQuestion } from 'react-icons/gr';
import styles from './Tooltip.module.css';

interface TooltipProps {
  showTooltip: boolean;
}

export default function Tooltip({ showTooltip }: TooltipProps) {
  return (
    <div className={styles.tooltipWrapper}>
      <GrCircleQuestion className={styles.tooltipIcon} />
      {showTooltip && (
        <div className={styles.tooltip}>
          Score ini adalah tingkat kepercayaan (confidence) model dalam memprediksi sentimen
        </div>
      )}
    </div>
  );
}
