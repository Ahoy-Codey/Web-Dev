import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/token/', form);
      sessionStorage.setItem('access', res.data.access);
      sessionStorage.setItem('refresh', res.data.refresh);
      alert('Login successful!');
    } catch {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input name="username" placeholder="Username" onChange={handleChange}
        className="w-full p-2 mb-2 border rounded" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange}
        className="w-full p-2 mb-4 border rounded" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Login
      </button>
    </form>
  );
}
