export const customError = (status: number, message: string) => {
  const error = {
    status,
    message,
  };
  return error;
};
