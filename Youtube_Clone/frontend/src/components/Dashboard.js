import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

export default function Dashboard() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('access');
    axios.get('/my-videos/', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setVideos(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Uploaded Videos</h1>
      <div className="grid grid-cols-2 gap-4">
        {videos.map(video => (
          <div key={video.id} className="bg-white p-3 rounded shadow">
            <video src={video.video} controls className="w-full rounded" />
            <h2 className="text-lg font-semibold mt-2">{video.title}</h2>
            <p className="text-gray-600">{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
