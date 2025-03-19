export const untilNow = (date: string) => {
  const days = Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
  return `${days} ${days === 1 ? "day" : "days"} ago`;
};
