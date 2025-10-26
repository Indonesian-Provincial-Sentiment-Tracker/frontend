import { useState, useEffect } from 'react';
import SentimentMap from '../components/SentimentMap/SentimentMap';
import SentimentStats from '../components/SentimentStats/SentimentStats';
import TopicsList from '../components/TopicsList/TopicsList';
import DateDisplay from '../components/DateDisplay/DateDisplay';
import Sidebar from '../components/Sidebar/Sidebar';
import { useSentimentData } from '../hooks/useSentimentData';
import { initializeProvinceMap } from '../utils/sentiment';
import type { ClickInfo } from '../types/sentiment';
import Icon from '../assets/images/icon.svg';
import styles from './Home.module.css';

export default function Home() {
  const [clicked, setClicked] = useState<ClickInfo | null>(null);
  const sentimentData = useSentimentData();

  useEffect(() => {
    if (sentimentData?.stateData) {
      initializeProvinceMap(sentimentData.stateData);
    }
  }, [sentimentData]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <img src={Icon} alt="icon" />
          <h1 className={styles.title}>Indonesia Sentiment Map</h1>
        </div>
      </div>

      <div className={`${styles.topRight} ${clicked ? styles.shifted : ''}`}>
        <DateDisplay />
        <SentimentStats />
      </div>

      <div className={styles.topicsList}>
        <TopicsList />
      </div>

      <div className={styles.mapContainer}>
        <SentimentMap onProvinceClick={setClicked} />
      </div>

      <Sidebar clicked={clicked} onClose={() => setClicked(null)} />
    </div>
  );
}
