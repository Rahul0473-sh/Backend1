export class ApiResponse {
  constructor(StatusCode, data, message = "sucess") {
    this.message = message;
    this.data = data;
    this.success = StatusCode < 400;
  }
}
