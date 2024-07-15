const isResSuccessful = (response: { code: number }) => [200, 201].includes(response.code);

export { isResSuccessful };
