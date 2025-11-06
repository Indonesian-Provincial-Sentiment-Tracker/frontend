import axios from 'axios';

export async function getHomeService(filter?: 'latest' | 'daily' | 'weekly' | 'monthly') {
  const base = `${import.meta.env.VITE_API_BASE_URL}`;
  const path = !filter || filter === 'latest' ? '/home' : `/home/${filter}`;
  const response = await axios.get(`${base}${path}`);
  return response.data.data;
}
