interface ErrorMessageProps {
  error: unknown;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => (
  <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
    {error instanceof Error
      ? error.message
      : "추천 레시피를 가져오는 중 오류가 발생했습니다"}
  </div>
);

export default ErrorMessage;
