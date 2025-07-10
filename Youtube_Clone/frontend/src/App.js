import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Upload from './components/Upload';
import VideoPlayer from './components/VideoPlayer';
import Login from './components/Login';

import WatchLater from './components/Watchlater';


function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/login" element={<Login />} />
              <Route path="/video/:id" element={<VideoPlayer />} />
              <Route path="/watchlater" element={<WatchLater />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
