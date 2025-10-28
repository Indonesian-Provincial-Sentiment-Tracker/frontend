import styles from './TopicsList.module.css';

export default function TopicsList({ datas }: { datas: any }) {
  if (!datas || datas.topics.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Trending Topics</h3>
        <div className={styles.noData}>Tidak ada data topics</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Trending Topics</h3>
      <div className={styles.topicsList}>
        {datas.topics.map((topic, index) => (
          <div key={index} className={styles.topicItem}>
            <div className={styles.topicName}>{topic?.topic || 'N/A'}</div>
            <div className={styles.keywords}>
              {(topic?.keywords || []).map((keyword, idx) => (
                <span key={idx} className={styles.keyword}>
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
