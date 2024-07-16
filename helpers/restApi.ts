const isResSuccessful = (response: { code?: number; status?: number | string } = {}) => {
  if (!response) return false;

  if (response.code) return [200, 201].includes(response.code);

  if (typeof response.status === 'number') return [200, 201].includes(response.status);

  return false;
};

export { isResSuccessful };
