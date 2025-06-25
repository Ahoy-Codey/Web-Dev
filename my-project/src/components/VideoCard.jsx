import '../index.css'
export default function VideoCard({ video, onLike, onWatchLater, liked, added }) {
  return (
    <div style={{margin:'10px'}}className="border p-3 rounded-lg">
      <img src={video.thumbnail} alt="thumbnail" className="w-full h-40 object-cover" />
      <h2 className="font-semibold mt-2">{video.title}</h2>
      <p className="text-sm text-gray-600">{video.channel}</p>
      <p >{video.views} • {video.time}</p>
      <div className="flex gap-4 mt-2">
        <button onClick={() => onLike(video.id)} className={liked ? 'text-red-500' : ''}>❤️</button>
        <button onClick={() => onWatchLater(video.id)} className={added ? 'text-green-500' : ''}>➕</button>
      </div>
    </div>
  );
}