import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get('/videos/').then(res => setVideos(res.data));
  }, []);

  return (
    <div>
    <h1 className="text-2xl font-bold mb-4">All Videos</h1>
      <div className="grid grid-cols-2 gap-4">
        {videos.map(video => (
          <div key={video.id} className="bg-white rounded-xl shadow-xl p-3  w-[600px] h-[400px] transition-transform hover:scale-105 hover:shadow-2xl">
            <Link  to={`/video/${video.id}`}>
            <video src={video.video} controls className="w-full h-[300px] rounded" />
            <h2 className="text-xl font-bold mt-2 text-gray-800">{video.title}</h2>
            <p className="text-gray-600">{video.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}