import { useEffect, useState } from 'react';
import { videos } from '../data/dummyVideos';
import VideoCard from '../components/VideoCard';
import Navbar from '../components/Navbar';  
import Timer from '../components/Timer';
export default function Home() {
  const [likes, setLikes] = useState(() => JSON.parse(sessionStorage.getItem('likes') || '[]'));
  const [watchLater, setWatchLater] = useState(() => JSON.parse(sessionStorage.getItem('watchLater') || '[]'));

  useEffect(() => {
    sessionStorage.setItem('likes', JSON.stringify(likes));
    sessionStorage.setItem('watchLater', JSON.stringify(watchLater));
  }, [likes, watchLater]);

  const handleLike = (id) => {
    setLikes(prev => prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]);
  };

  const handleWatchLater = (id) => {
    setWatchLater(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]);
  };

  return (
    <>
          <Navbar />
      <Timer />
    <div className="flex flex-wrap gap-10 p-6">
      {videos.map(video => (
        <VideoCard
          key={video.id}
          video={video}
          onLike={handleLike}
          onWatchLater={handleWatchLater}
          liked={likes.includes(video.id)}
          added={watchLater.includes(video.id)}
        />
      ))}
    </div>
      </>
  );
}