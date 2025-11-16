import { Dispatch, SetStateAction } from 'react';

interface NotificationProps {
  event_type: string;
  value: string;
  date?: string;
}

export function notificationService(
  setData: Dispatch<SetStateAction<NotificationProps | null>>,
  setUniqueKey: Dispatch<SetStateAction<number>>,
  getFilter: () => string,
  getOption: () => string | false
) {
  const sse = new EventSource(`${import.meta.env.VITE_API_BASE_URL}/notify`);

  sse.onerror = (err) => {
    console.log(err);
    sse.close();
  };

  sse.addEventListener('Info', (e) => {
    const currentFilter = getFilter();
    const currentOption = getOption();
    const shouldRefetch = checkShouldRefetch(e, currentFilter, currentOption);

    getSSETemplate(e, setData);
    if (shouldRefetch) {
      setUniqueKey((prev) => prev + 1);
    }
  });

  sse.addEventListener('Warning', (e) => {
    getSSETemplate(e, setData);
  });
  sse.addEventListener('Error', (e) => {
    getSSETemplate(e, setData);
  });

  return () => {
    sse.close();
  };
}

function checkShouldRefetch(
  e: MessageEvent<string>,
  filter: string,
  option?: string | false
): boolean {
  if (filter === 'latest') {
    return true;
  }

  if (filter === 'daily' || filter === 'weekly' || filter === 'monthly') {
    if (!option) {
      return false;
    }

    try {
      const today = new Date();
      const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

      if (filter === 'daily') {
        const selectedDate = option.toString();

        return selectedDate === todayStr;
      }

      return false;
    } catch (err) {
      console.log(err);
    }
  }

  return false;
}

function getSSETemplate(
  e: MessageEvent<string>,
  setData: Dispatch<SetStateAction<NotificationProps | null>>
) {
  try {
    const parsing = JSON.parse(e.data);
    setData(parsing.data);
  } catch (err) {
    console.log(err);
    setData(null);
  }
}
