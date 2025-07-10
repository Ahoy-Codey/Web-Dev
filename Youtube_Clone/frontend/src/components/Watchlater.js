import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { Link } from "react-router-dom";

export default function WatchLater() {
  const [videos, setVideos] = useState([]);
  const token = sessionStorage.getItem("access");

  useEffect(() => {
    if (token) {
      axios.get("/watchlater/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => setVideos(res.data));
    }
  }, [token]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center"><span class="material-icons m-4">watch_later</span> Watch Later</h1>
      <div className="grid gap-4">
        {videos.map(video => (
          <Link to={`/video/${video.id}`} key={video.id} className="block border p-3 rounded hover:bg-gray-100">
            <h2 className="text-lg font-semibold">{video.title}</h2>
            <p className="text-gray-600">{video.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}