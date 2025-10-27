import type { SentimentResponse } from '../types/sentiment';

const DUMMY_API_URL = '/dummy.json';

export async function fetchSentimentData(): Promise<SentimentResponse | null> {
  try {
    const res = await fetch(DUMMY_API_URL, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) return null;
    const resJson = await res.json();
    return resJson as SentimentResponse;
  } catch (err) {
    return null;
  }
}
