import within24Hours from './within24Hours';

const formatTime = (time: string): string => {
  if (time === '') return '';

  const date = new Date(time);

  if (within24Hours(time)) return `${date.getHours()}:${date.getMinutes()}`;

  return `${date.getDate()}/${date.getMonth() + 1}/${
    date.getFullYear() - 2000
  }`;
};

export default formatTime;
