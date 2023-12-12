import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ko from 'date-fns/locale/ko';

export const formatDateToNow = (createdAt: string) => {
  const date = new Date(createdAt);
  let formattedDate = formatDistanceToNow(date, { addSuffix: true, locale: ko });
  formattedDate = formattedDate.replace('약 ', '');
  return formattedDate;
};
