interface ErrorType {
  code: number;
  fieldPath: string;
  type: string;
  userMessage: string;
  message: string;
  logs: string;
  msg: Msg;
}

interface errorObj {
  code: number;
  fieldPath: string;
  logs: string;
  isBlocker?: boolean;
  message?: string;
  userMessage?: string;
  url?: string;
  type: string;
}

interface errorResult {
  [k: string]: unknown;
  DEV?: string;
  PREPROD?: string;
  PROD?: string;
  cta?: string;
  http_code?: number;
  user_message?: string;
}

interface Msg {
  http_code: number;
  cta: string;
  user_message: string;
  PROD: string;
  PREPROD: string;
  DEV: string;
}

interface AlertError {
  code: number;
  message: string;
  userMessage: string;
}
