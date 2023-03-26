import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/blocks/Header';
import Movies from './components/sections/Movies/Movies';
import Search from './components/sections/Search/Search';
import Favourite from './components/sections/Favourite/Favourite';

function App() {
  return (
    <div className="bg-slate-200 min-h-full w-full">
      <BrowserRouter basename="/react-movie-app/">
        <Header />
        <div className="container mx-auto">
          <Routes>
            <Route
              path="/"
              element={<Movies />}
            />
            <Route
              path="/search"
              element={<Search />}
            />
            <Route
              path="/favourite"
              element={<Favourite />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
