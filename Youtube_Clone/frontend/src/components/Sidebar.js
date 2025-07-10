import React from 'react';
import { Link } from 'react-router-dom';
export default function Sidebar() {
  return (
    <aside className="sticky top-0 w-48 bg-gray-900 p-4 h-screen border-r-2 border-blue-950 text-white   ">
      <ul className="space-y-3">
        <li><Link to="/" className=" flex items-center gap-3 block hover:text-blue-600 "> <span class="material-icons">home</span>Home</Link></li>
        <li><Link to="/dashboard" className="flex items-center gap-3 block hover:text-blue-600"> <span class="material-icons">dashboard</span>Dashboard</Link></li>
        <li><Link to="/login" className=" flex items-center gap-3 block hover:text-blue-600"><span class="material-icons">login</span>Login</Link></li>
        <li><Link to="/upload" className="flex items-center gap-3 block hover:text-blue-600"><span class="material-icons">upload</span>Upload</Link></li>
        <li><Link to="/watchlater" className="flex items-center gap-3 block hover:text-blue-600"><span class="material-icons">watch_later</span>WatchLater</Link></li>
      </ul>
    </aside>
  );
}
