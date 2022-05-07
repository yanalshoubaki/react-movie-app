import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/blocks/Header";
import Movies from "./components/sections/Movies/Movies";
import Search from "./components/sections/Search/Search";
import Favourite from "./components/sections/Favourite/Favourite";
const App = () => {
  return (
    <div className="bg-slate-200 min-h-full">
      <div className="container">
        <BrowserRouter basename="/react-movie-app/">
          <Header />
          <Routes>
            <Route path="/" exet element={<Movies />} />
            <Route path="/search" exet element={<Search />} />
            <Route path="/favourite" exet element={<Favourite />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
