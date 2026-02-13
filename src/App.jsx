import React from "react";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import Surprise from './pages/Surprise';
import Reply from './pages/Reply';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/s/:code" element={<Surprise />} />
        <Route path="/reply/:code" element={<Reply />} />
      </Routes>
    </BrowserRouter>
  );
}
