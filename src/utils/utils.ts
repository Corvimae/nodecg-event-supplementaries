export const BUNDLE_NAME = 'nodecg-event-supplementaries';

// eslint-disable-next-line no-console
export function log(message: string, source = BUNDLE_NAME, method = console.log) {
  return method(`[${source}] ${message}`);
}

export function logInfo(message: string, source = BUNDLE_NAME) {
  return log(message, source, console.info);
}


export function logWarning(message: string, source = BUNDLE_NAME) {
  return log(message, source, console.warn);
}


export function logError(message: string, source = BUNDLE_NAME) {
  return log(message, source, console.error);
}