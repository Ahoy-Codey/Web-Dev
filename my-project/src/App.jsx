import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WatchLater from "./pages/WatchLater";
import Navbar from "./components/Navbar";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/watch-later" element={<WatchLater />} />
            </Routes>
        </BrowserRouter>
    );
}