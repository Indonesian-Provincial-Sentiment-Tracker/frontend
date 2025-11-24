import axios from 'axios';

export async function getHomeService(
  filter?: 'latest' | 'daily' | 'weekly' | 'monthly',
  option?: {
    date?: string | false;
    from_date?: string | false;
    to_date?: string | false;
    month?: string | false;
    year?: string | false;
  }
) {
  const base = `${import.meta.env.VITE_API_BASE_URL}`;
  const params = new URLSearchParams();

  let endpoint = `${base}/home`;

  if (filter === 'daily' && option?.date) {
    params.append('date', option.date.toString());
    endpoint = `${base}/home/daily`;
  } else if (filter === 'weekly' && option?.from_date && option?.to_date) {
    params.append('from_date', option.from_date.toString());
    params.append('to_date', option.to_date.toString());
    endpoint = `${base}/home/weekly`;
  } else if (filter === 'monthly' && option?.month && option?.year) {
    params.append('month', option.month.toString());
    params.append('year', option.year.toString());
    endpoint = `${base}/home/monthly`;
  }

  const queryString = params.toString();
  const fullEndpoint = `${endpoint}${queryString ? `?${queryString}` : ''}`;

  const response = await axios.get(fullEndpoint);
  return response.data.data;
}
