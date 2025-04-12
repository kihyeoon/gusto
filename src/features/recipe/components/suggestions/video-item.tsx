import Image from "next/image";

import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";

import { VideoData } from "./types";

export interface VideoItemProps {
  video: VideoData;
  index: number;
  onSelectVideo: (url: string) => void;
  isLoading: boolean;
}

const VideoItem = ({
  video,
  index,
  onSelectVideo,
  isLoading,
}: VideoItemProps) => (
  <BlurFade delay={index * 0.1} direction="up" blur="4px" className="w-full">
    <Button
      variant="ghost"
      className="group h-auto w-full overflow-hidden rounded-lg p-0 transition-all hover:bg-gray-100 dark:hover:bg-gray-700"
      onClick={() =>
        onSelectVideo(`https://www.youtube.com/watch?v=${video.id}`)
      }
      disabled={isLoading}
    >
      <div className="flex w-full items-center gap-3 p-2">
        <div className="flex-shrink-0 overflow-hidden rounded-md">
          <Image
            src={video.thumbnail}
            alt={video.title}
            width={144}
            height={80}
            className="h-20 w-36 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="min-w-0 flex-[1_1_0] text-left">
          <p className="line-clamp-2 whitespace-normal break-words break-keep text-sm font-medium text-gray-800 dark:text-gray-200">
            {video.title}
          </p>
          <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
            {video.channelTitle}
          </p>
        </div>
      </div>
    </Button>
  </BlurFade>
);

export default VideoItem;
