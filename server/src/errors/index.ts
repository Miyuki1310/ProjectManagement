class CustomApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const createCustomError = (message: string, status: number) => {
  return new CustomApiError(message, status);
};

export { CustomApiError, createCustomError };
