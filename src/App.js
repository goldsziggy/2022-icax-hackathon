import React from 'react';
import {
  Route,
  Routes,
  BrowserRouter,
} from 'react-router-dom';
import Layout from './layout';

import Game1 from './pages/game-1';
import Game2 from './pages/game-2';
import Game3 from './pages/game-3';

export default function App() {
  return (
    <BrowserRouter basename="/2022-icax-hackathon">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="1"
            element={<Game1 />}
          />
          <Route path="2" element={<Game2 />} />
          <Route path="3" element={<Game3 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
