import dayjs from 'dayjs';
const isToday = (dateString: string): boolean => {
  const today = new Date();
  const date = new Date(dateString);
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const isThisYear = (dateString: string): boolean => {
  const today = new Date();
  const date = new Date(dateString);
  return date.getFullYear() === today.getFullYear();
};

export const timeFormat = (strTime: string): string => {
  const today = isToday(strTime);
  const thisYear = isThisYear(strTime);

  if (today) return dayjs(strTime).format('HH:mm');
  if (thisYear) return dayjs(strTime).format('DD MMM HH:mm');
  else return dayjs(strTime).format('DD MMM YYYY HH:mm');
};
