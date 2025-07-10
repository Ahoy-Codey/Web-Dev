import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900  text-white p-4 flex justify-between items-center">
      <Link to="/" className=" flex items-center text-xl font-bold">
        <span class="material-icons">smart_display</span>YTClone
      </Link>
      <div className="bg-gray-900    p-4 flex justify-center">
        <form className="flex w-full max-w-xl ">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 rounded-l-full bg-black text-white outline-none focus:border-2 focus:border-solid "
          />
          <button
            type="submit"
            className="bg-gray-700 text-white px-4 rounded-r-full focus:border-2 focus:border-solid "
          >
            <span class="material-icons flex items-center">search</span>
          </button>
        </form>
      </div>
      <div className="space-x-4">
        <Link to="/upload" className="hover:underline">
          Upload
        </Link>
        <Link to="/login" className="hover:underline">
          Login
        </Link>
      </div>
    </nav>
  );
}
