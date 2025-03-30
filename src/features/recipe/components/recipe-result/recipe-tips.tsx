import { BlurFade } from "@/components/ui/blur-fade";

interface RecipeTipsProps {
  tips: string[];
}

const RecipeTips = ({ tips }: RecipeTipsProps) => {
  if (!tips || tips.length === 0) return null;

  return (
    <div className="space-y-4">
      <BlurFade>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          요리 팁
        </h3>
        <ul className="mt-2 space-y-2">
          {tips.map((tip, index) => (
            <BlurFade key={index} delay={index * 0.05} direction="up">
              <li className="flex gap-2 rounded-md bg-amber-50 p-3 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
                <svg
                  className="h-5 w-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{tip}</span>
              </li>
            </BlurFade>
          ))}
        </ul>
      </BlurFade>
    </div>
  );
};

export default RecipeTips;
