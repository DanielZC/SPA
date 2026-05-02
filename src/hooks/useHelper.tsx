export const useHelper = () => {
  const limitString = (str: string, maxLength: number = 20): string => {
    if (str.length <= maxLength) return str;
    return `${str.slice(0, maxLength)}...`;
  };

  return { limitString };
};
