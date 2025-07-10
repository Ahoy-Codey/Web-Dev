import React, { useState } from 'react';
import axios from '../axiosConfig';

export default function Upload() {
  const [formData, setFormData] = useState({ title: '', description: '', video: null });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('access');
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('video', formData.video);

    try {
      await axios.post('/videos/upload/', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Video uploaded!');
    } catch {
      alert('Upload failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Upload Video</h2>
      <input name="title" type="text" placeholder="Title" onChange={handleChange}
        className="w-full p-2 mb-2 border rounded" />
      <textarea name="description" placeholder="Description" onChange={handleChange}
        className="w-full p-2 mb-2 border rounded" />
      <input name="video" type="file" accept="video/*" onChange={handleChange}
        className="w-full p-2 mb-4" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Upload
      </button>
    </form>
  );
}
