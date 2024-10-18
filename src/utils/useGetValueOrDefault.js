export const useGetValueOrDefault = (value, defaultValue = 'N/A') => {
  return value ? value : defaultValue;
};
