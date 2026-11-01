/* Minimal logger so app code never calls console.* directly. */
type Level = "info" | "warn" | "error";

function emit(level: Level, ...args: unknown[]) {
  if (process.env.NODE_ENV === "test") return;
  // eslint-disable-next-line no-console
  console[level](...args);
}

export const logger = {
  info: (...args: unknown[]) => emit("info", ...args),
  warn: (...args: unknown[]) => emit("warn", ...args),
  error: (...args: unknown[]) => emit("error", ...args),
};
