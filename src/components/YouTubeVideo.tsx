// src/components/YouTubeVideo.tsx
import React from 'react';

interface YouTubeVideoProps {
  videoUrl: string;
  title?: string;
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ videoUrl, title }) => {
  // Extract video ID from various YouTube URL formats
  const getYouTubeId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const videoId = getYouTubeId(videoUrl);

  if (!videoId) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-600 text-sm">Invalid YouTube URL</p>
        <p className="text-red-500 text-xs mt-1">{videoUrl}</p>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title || 'YouTube video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-lg"
      />
    </div>
  );
};

export default YouTubeVideo;