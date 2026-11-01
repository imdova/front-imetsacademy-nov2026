/** Shared domain errors. The mock DB and the HTTP client throw the same types. */
export class NotFoundError extends Error {
  readonly code = "NOT_FOUND";
  constructor(message = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
  }
}

export function isNotFoundError(error: unknown): error is NotFoundError {
  return (
    error instanceof NotFoundError ||
    (typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: unknown }).code === "NOT_FOUND")
  );
}
