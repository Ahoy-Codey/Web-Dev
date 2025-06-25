import { useEffect, useState } from 'react';
import { videos } from '../data/dummyVideos';
import VideoCard from '../components/VideoCard';
import Navbar from '../components/Navbar';
import Timer from '../components/Timer';
export default function WatchLater() {
    const [watchLater, setWatchLater] = useState(() => JSON.parse(sessionStorage.getItem('watchLater') || '[]'));

    const removeFromWatchLater = (id) => {
        const updated = watchLater.filter(w => w !== id);
        setWatchLater(updated);
        sessionStorage.setItem('watchLater', JSON.stringify(updated));
    };

    const filteredVideos = videos.filter(video => watchLater.includes(video.id));

    return (
        <>
            <Navbar />
            <Timer />
            <div className="flex flex-wrap gap-6 p-6">
                {filteredVideos.map(video => (
                    <VideoCard
                        key={video.id}
                        video={video}
                        onLike={() => { }}
                        onWatchLater={removeFromWatchLater}
                        liked={false}
                        added={true}
                    />
                ))}
            </div>
        </>
    );
}