import { ERROR_MESSAGES, ERROR_CODES } from "@/libs/api/error-codes";

export function handleApiError(response: { error?: number }) {
  if (!response) return;
  const { error } = response;
  const errorMessage = {
    data: {
      error: true,
      message: "",
    },
  };
  if (error) {
    const message = ERROR_MESSAGES[error] || "예기치 못한 에러가 발생했습니다.";
    switch (error) {
      case ERROR_CODES.NO_TOKEN:
      case ERROR_CODES.INVALID_TOKEN:
      case ERROR_CODES.EXPIRED_TICKET:
        window.location.href = "/login";
        break;

      case ERROR_CODES.NO_PERMISSION:
        window.location.href = "/unauthorized";
        break;
    }
    errorMessage.data.message = message;
    return errorMessage;
  }

  errorMessage.data.message = "예기치 못한 에러가 발생했습니다.";
  return errorMessage;
}
