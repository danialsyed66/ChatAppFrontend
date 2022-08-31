const getInitials = (name: string): string => {
  const initials = name
    .split(' ')
    .map(val => val[0])
    .join('')
    .toUpperCase();

  return initials;
};

export default getInitials;
