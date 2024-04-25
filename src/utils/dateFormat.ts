export const dateFormat = (date: string): string => {
  return new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short' }).format(new Date(date));
};
