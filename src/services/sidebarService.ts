import axios from 'axios';
import { TweetsResponse } from '../types/sentiment';

export async function getSidebarService(
  stateId: string | boolean,
  type: string,
  filter: 'daily' | 'weekly' | 'monthly',
  page?: number
) {
  const base = `${import.meta.env.VITE_API_BASE_URL}`;

  if (type === 'tweets') {
    let endpoint = `${base}/state/${stateId}/tweets?page=${page || 1}`;
    if (filter === 'weekly') {
      endpoint = `${base}/state/${stateId}/weekly/tweets?page=${page || 1}`;
    } else if (filter === 'monthly') {
      endpoint = `${base}/state/${stateId}/monthly/tweets?page=${page || 1}`;
    }

    const response = await axios.get<TweetsResponse>(endpoint);
    return response.data;
  }

  let endpoint = `${base}/state/${stateId}`;
  if (filter === 'weekly') {
    endpoint = `${base}/state/${stateId}/weekly`;
  } else if (filter === 'monthly') {
    endpoint = `${base}/state/${stateId}/monthly`;
  }

  const response = await axios.get(endpoint);
  return response.data.data;
}
