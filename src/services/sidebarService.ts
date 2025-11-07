import axios from 'axios';
import { TweetsResponse } from '../types/sentiment';

export async function getSidebarService(
  stateId: string | boolean,
  type: string,
  filter: 'latest' | 'daily' | 'weekly' | 'monthly',
  option: {
    date?: string | false;
    from_date?: string | false;
    to_date?: string | false;
    month?: string | false;
    year?: string | false;
  },
  page?: number
) {
  const base = `${import.meta.env.VITE_API_BASE_URL}`;
  const params = new URLSearchParams();
  if (page) params.append('page', page.toString());

  let endpoint = `${base}/state/${stateId}`;

  if (filter === 'daily' && option.date) {
    params.append('date', option.date.toString());
    endpoint = `${base}/state/${stateId}/daily`;
  } else if (filter === 'weekly' && option.from_date && option.to_date) {
    params.append('from_date', option.from_date.toString());
    params.append('to_date', option.to_date.toString());
    endpoint = `${base}/state/${stateId}/weekly`;
  } else if (filter === 'monthly' && option.month && option.year) {
    params.append('month', option.month.toString());
    params.append('year', option.year.toString());
    endpoint = `${base}/state/${stateId}/monthly`;
  }

  const queryString = params.toString();

  if (type === 'tweets') {
    const tweetsEndpoint = `${endpoint}/tweets${queryString ? `?${queryString}` : ''}`;
    const response = await axios.get<TweetsResponse>(tweetsEndpoint);
    return response.data;
  }

  const fullEndpoint = `${endpoint}${queryString ? `?${queryString}` : ''}`;
  const response = await axios.get(fullEndpoint);
  return response.data.data;
}
