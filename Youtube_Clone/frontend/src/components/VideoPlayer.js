import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axiosConfig";

export default function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const token = sessionStorage.getItem("access");
    
  // Fetch video and comments
  useEffect(() => {
    axios.get(`/videos/${id}/`).then((res) => setVideo(res.data));
    axios.get(`/videos/${id}/comments/`).then(res => setComments(res.data));
  }, [id]);

  if (!video) return <p>Loading...</p>;

  // Like video
  const handleLike = async () => {
    if (!token) return alert("Please login to like");
    try {
      await axios.post(`/videos/${video.id}/like/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error liking video");
    }
  };

  // Dislike video
  const handleDislike = async () => {
    if (!token) return alert("Please login to dislike");
    try {
      await axios.post(`/videos/${video.id}/dislike/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error disliking video");
    }
  };

  // Watch Later
  const handleWatchLater = async () => {
    if (!token) return alert("Login required");
    try {
      await axios.post("/watchlater/add/", { video_id: video.id }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Added to Watch Later");
    } catch (err) {
      console.error("Watch Later Error", err);
      alert("Could not add to Watch Later");
    }
  };

  // Submit Comment
  const submitComment = async () => {
    if (!token) return alert("Login to comment");
    try {
      await axios.post(`/videos/${id}/comments/`, { text: newComment }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewComment('');
      const res = await axios.get(`/videos/${id}/comments/`);
      setComments(res.data);
    } catch (err) {
      console.error("POST ERROR:", err.response?.data || err.message);
      alert("Error posting comment");
    }
  };
  console.log(video.video);
  console.log("Token:", token);
//Main UI for the Website
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <video
        src={`http://127.0.0.1:8000${video.video}`}
        controls
        className="w-full rounded-lg mb-4 shadow-xl"
      />
      <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
      <p className="text-gray-700">{video.description}</p>
      <div className="flex gap-4 my-2 ">
        <button onClick={handleLike} className="flex items-center text-green-600">
          <span class="material-icons m-4">thumb_up</span> Like
        </button>
        <button onClick={handleDislike} className=" flex items-center text-red-600">
         <span class="material-icons m-4">thumb_down</span> Dislike
        </button>
      </div>
      <p className="text-gray-600 text-sm"><div className="flex items-center"><span class="material-icons m-4">thumb_up</span>
  {video.likes}   <span class="material-icons m-4">thumb_down</span> {video.dislikes}</div>
  </p>
  <button onClick={handleWatchLater} className="text-blue-600">
  <div className="flex items-center"><span class="material-icons m-4">watch_later</span> Watch Later</div>
</button>
  <div className="mt-6">
  <h2 className="text-xl font-semibold mb-2">Comments</h2>

  <div className="mb-4">
    <textarea
      className="w-full p-2 border rounded shadow-xl"
      rows="3"
      placeholder="Write a comment..."
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
    />
    <button
      onClick={submitComment}
      className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
    >
      Post Comment
    </button>
  </div>

  {comments.map((c) => (
    <div key={c.id} className=" shadow-lg border-b py-2 px-3 m-2">
      <p className="text-sm text-gray-800">
        <strong>{c.user}</strong> – {c.text}
      </p>
      <p className="text-xs text-gray-500">{new Date(c.created_at).toLocaleString()}</p>
    </div>
  ))}
</div>
    </div>
  );
}
