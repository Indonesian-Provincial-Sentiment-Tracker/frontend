import { IoClose } from 'react-icons/io5';
import type { ClickInfo } from '../../types/sentiment';
import styles from './Sidebar.module.css';

interface SidebarProps {
  clicked: ClickInfo | null;
  onClose: () => void;
}

export default function Sidebar({ clicked, onClose }: SidebarProps) {
  if (!clicked) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <h2 className={styles.title}>Detail Provinsi</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <IoClose />
          </button>
        </div>
        <div className={styles.content}>
          <h1>Hello World</h1>
          <p>State ID: {clicked.stateId}</p>
        </div>
      </div>
    </>
  );
}
