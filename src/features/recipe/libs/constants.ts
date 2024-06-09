export const errorMessages = {
  INVALID_URL: {
    message: "올바르지 않은 URL입니다.",
    description: "자막이 사용 가능한 YouTube 요리 영상의 URL을 입력해주세요.",
  },
  CANNOT_CREAT_RECIPE: {
    message: "레시피 생성에 실패했습니다.",
    description: "다시 시도해주세요.",
  },
  CANNOT_FIND_RECIPE: {
    message: "레시피를 찾을 수 없습니다.",
    description: "요리와 관련된 영상의 URL을 입력해주세요.",
  },
  CANNOT_DELETE_RECIPE: {
    message: "레시피 삭제에 실패했습니다.",
    description: "다시 시도해주세요.",
  },
} as const;
