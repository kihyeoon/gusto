import { VideoData } from "./types";
import VideoItem from "./video-item";

interface VideoListProps {
  videos: VideoData[];
  onSelectVideo: (url: string) => void;
  isLoading: boolean;
}

const VideoList = ({ videos, onSelectVideo, isLoading }: VideoListProps) => (
  <div className="grid gap-3">
    {videos.map((video, index) => (
      <VideoItem
        key={video.id}
        video={video}
        index={index}
        onSelectVideo={onSelectVideo}
        isLoading={isLoading}
      />
    ))}
  </div>
);

export default VideoList;
