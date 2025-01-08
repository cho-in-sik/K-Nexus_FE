export const getLocalStorage = (): string | null => {
  if (typeof window !== 'undefined') {
    const value: string | null = localStorage.getItem('token');
    return value ? value : null;
  }
  return null;
};
