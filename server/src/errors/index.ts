export class CustomApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, CustomApiError.prototype);
  }
}
