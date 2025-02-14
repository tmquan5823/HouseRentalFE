import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RoomRental from "./pages/RoomRental/RoomRental";

const App = () => {
  return (
    <Router>
      {/* Bọc toàn bộ ứng dụng với nền xám */}
      <div className="min-h-screenflex justify-center items-center">
        <div className="w-full max-w-6xl p-4 bg-white shadow-md rounded-lg">
          <Routes>
            <Route path="/" element={<RoomRental />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
