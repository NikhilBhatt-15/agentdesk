export class AppError extends Error {
  constructor(
    public readonly code: string,
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
  }
}
export class NotFoundError extends AppError {
  constructor(
    message = "Resource not found",
    code = "NOT_FOUND",
  ) {
    super(code, 404, message);
  }
}

export class ConflictError extends AppError {
  constructor(
    message = "Resource already exists",
    code = "CONFLICT",
  ) {
    super(code, 409, message);
  }
}