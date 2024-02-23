export class ApiError extends Error {
  constructor(statusCode, message, stack = "", errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;
  }
}
// there was logic here which was'nt much important