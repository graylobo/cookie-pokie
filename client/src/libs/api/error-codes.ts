export const ERROR_CODES = {
  NOT_FOUND_USER: 30001,
  WRONG_PASSWORD: 30002,
  NO_TOKEN: 30003,
  NO_TICKET: 30004,
  EXPIRED_TICKET: 30005,
  MISSING_REQUIRED_PARAM: 30006,
  NOT_FOUND_RESULT: 30007,
  NO_PERMISSION: 30008,
  ALREADY_EXISTS: 30009,
  CANNOT_SAVE_OWN_POST: 30010,
  INVALID_DATA: 30011,
  INCORRECT_REQUEST: 30012,
  INVALID_USER: 30013,
  INVALID_TOKEN: 30014,
  INTERNAL_SERVER_ERROR: 30015,
  S3_UPLOAD_ERROR: 30016,
  MAX_MEMBER_ERROR: 30017,
  DUPLICATE_REPORT_TYPE: 30018,
  NOT_FOUND_DRAWING_ARCHIVE: 30019,
  NOT_FOUND_REPORT_TYPE: 30020,
  NOT_FOUND_TOPIC_ID: 30021,
  EXIST_TOPIC_SEQ: 30022,
} as const;

export const ERROR_MESSAGES: Record<number, string> = {
  [ERROR_CODES.NOT_FOUND_USER]: "사용자가 존재하지 않습니다.",
  [ERROR_CODES.WRONG_PASSWORD]: "잘못된 패스워드입니다.",
  [ERROR_CODES.NO_TOKEN]: "토큰이 없습니다.",
  [ERROR_CODES.NO_TICKET]: "티켓이 없습니다.",
  [ERROR_CODES.EXPIRED_TICKET]: "토큰이 만료되었습니다.",
  [ERROR_CODES.MISSING_REQUIRED_PARAM]: "필수 파라미터가 누락되었습니다.",
  [ERROR_CODES.NOT_FOUND_RESULT]: "결과가 존재하지 않습니다.",
  [ERROR_CODES.NO_PERMISSION]: "권한이 없습니다.",
  [ERROR_CODES.ALREADY_EXISTS]: "이미 존재하는 데이터입니다.",
  [ERROR_CODES.CANNOT_SAVE_OWN_POST]: "자신의 게시물을 수정할 수 없습니다.",
  [ERROR_CODES.INVALID_DATA]: "데이터가 유효하지 않습니다.",
  [ERROR_CODES.INCORRECT_REQUEST]: "요청이 올바르지 않습니다.",
  [ERROR_CODES.INVALID_USER]: "사용자가 유효하지 않습니다.",
  [ERROR_CODES.INVALID_TOKEN]: "토큰이 유효하지 않습니다.",
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: "서버 내부 오류가 발생했습니다.",
  [ERROR_CODES.S3_UPLOAD_ERROR]:
    "이미지 업로드 과정중 오류가 발생하였습니다. 이미지를 다시 등록해주세요.",
  [ERROR_CODES.MAX_MEMBER_ERROR]: "최대 인원 수를 초과하였습니다.",
  [ERROR_CODES.DUPLICATE_REPORT_TYPE]: "이미 존재하는 신고사유 입니다.",
  [ERROR_CODES.NOT_FOUND_DRAWING_ARCHIVE]:
    "해당 아카이브 ID가 존재하지 않습니다.",
  [ERROR_CODES.NOT_FOUND_REPORT_TYPE]: "해당 신고 유형이 존재하지 않습니다.",
  [ERROR_CODES.NOT_FOUND_TOPIC_ID]: "해당 관심분야가 존재하지 않습니다.",
  [ERROR_CODES.EXIST_TOPIC_SEQ]: "해당 우선순위의 관심분야가 이미 존재합니다.",
};
