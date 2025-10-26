/* eslint-disable no-undef */
import { IoClose } from 'react-icons/io5';
import { useEffect } from 'react';
import type { ClickInfo } from '../../types/sentiment';
import styles from './Sidebar.module.css';

interface SidebarProps {
  clicked: ClickInfo | null;
  onClose: () => void;
}

export default function Sidebar({ clicked, onClose }: SidebarProps) {
  useEffect(() => {
    if (clicked?.stateId) {
      console.log('State ID:', clicked.stateId);
    }
  }, [clicked?.stateId]);

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
