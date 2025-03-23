"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { useState } from "react";

import { BlurFade } from "@/components/ui/blur-fade";

import { notificationSchema } from "@/app/(object)/api/use-object/schema";

export default function Page() {
  const { object, submit, isLoading, stop } = useObject({
    api: "/api/use-object",
    schema: notificationSchema,
  });
  const [showRawData, setShowRawData] = useState(false);

  return (
    <div className="w-full space-y-8 p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800 dark:text-white">
        알림 생성기
      </h1>

      <div className="flex items-center justify-between">
        <button
          onClick={() => submit("Messages during finals week.")}
          disabled={isLoading}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          알림 생성하기
        </button>

        {isLoading && (
          <button
            type="button"
            onClick={() => stop()}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-red-600"
          >
            중지
          </button>
        )}

        <button
          onClick={() => setShowRawData(!showRawData)}
          className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
            showRawData
              ? "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          {showRawData ? "카드 보기" : "JSON 보기"}
        </button>
      </div>

      {object && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              생성된 알림
            </h2>
          </div>

          {showRawData ? (
            <BlurFade className="w-full">
              <div className="overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900">
                <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-200">
                  {JSON.stringify(object, null, 2)}
                </pre>
              </div>
            </BlurFade>
          ) : (
            object.notifications &&
            object.notifications.length > 0 && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {object.notifications.map((notification, index) => (
                  <BlurFade
                    key={index}
                    delay={index * 0.1}
                    direction="up"
                    duration={0.5}
                    offset={10}
                  >
                    <div className="h-full rounded-lg border border-gray-200 bg-white p-5 shadow-md transition-shadow duration-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
                      <p className="mb-2 text-lg font-medium text-gray-800 dark:text-white">
                        {notification?.name}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {notification?.message}
                      </p>
                    </div>
                  </BlurFade>
                ))}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
