const within24Hours = (time: string): boolean => {
  const then = new Date(time);
  const now = new Date();

  const msBetweenDates = Math.abs(then.getTime() - now.getTime());

  const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

  if (hoursBetweenDates < 24) return true;

  return false;
};

export default within24Hours;
