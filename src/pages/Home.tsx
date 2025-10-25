import SentimentMap from '../components/SentimentMap/SentimentMap';
import Card from '../components/ui/Card/Card';

export default function Home() {
  return (
    <div style={{ padding: 16, maxWidth: 1200, margin: '0 auto' }}>
      <Card>
        <SentimentMap />
      </Card>
    </div>
  );
}

