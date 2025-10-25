import { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export default function Card({ title, children, footer, className }: CardProps) {
  return (
    <div className={`${styles.card}${className ? ` ${className}` : ''}`}>
      {title ? <div className={styles.header}>{title}</div> : null}
      <div className={styles.content}>{children}</div>
      {footer ? <div className={styles.footer}>{footer}</div> : null}
    </div>
  );
}
