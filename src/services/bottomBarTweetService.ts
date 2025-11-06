import axios from 'axios';

export async function getButtomBarTweetService(id: string | boolean) {
  const base = `${import.meta.env.VITE_API_BASE_URL}`;
  const response = await axios.get(`${base}/tweets/${id}`);
  return response.data.data;
}
