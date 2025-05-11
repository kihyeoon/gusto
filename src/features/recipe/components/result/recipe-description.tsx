import Image from "next/image";

import { BlurFade } from "@/components/ui/blur-fade";

import { cloudFrontLoader } from "@/libs/cloudfront-loader";

interface RecipeDescriptionProps {
  description: string;
  url?: string;
  initialUrl?: string;
  title: string;
  imgSrc: string;
  getThumbnailUrl: (url: string) => string;
  handleImageError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const RecipeDescription = ({
  description,
  url,
  initialUrl,
  title,
  imgSrc,
  getThumbnailUrl,
  handleImageError,
}: RecipeDescriptionProps) => {
  if (!description) return null;

  return (
    <BlurFade>
      {url ? (
        <a href={url} target="_blank" rel="noreferrer" className="mb-4 block">
          <Image
            priority
            src={getThumbnailUrl(url)}
            alt={title || "레시피 썸네일"}
            width={500}
            height={300}
            className="w-full rounded-lg"
            loader={cloudFrontLoader}
          />
        </a>
      ) : (
        initialUrl && (
          <a
            href={initialUrl}
            target="_blank"
            rel="noreferrer"
            className="mb-4 block"
          >
            <Image
              priority
              src={imgSrc}
              alt={title || "레시피 썸네일"}
              width={500}
              height={300}
              className="w-full rounded-lg"
              onError={handleImageError}
              loader={cloudFrontLoader}
            />
          </a>
        )
      )}
      <p className="rounded-lg bg-gray-50 p-4 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {description}
      </p>
    </BlurFade>
  );
};

export default RecipeDescription;
