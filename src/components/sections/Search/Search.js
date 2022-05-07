import React, { useState, useEffect } from "react";
import * as Unicons from "@iconscout/react-unicons";

import MovieDetails from "../../blocks/MovieDetails";
import api from "../../../services/api";
const Search = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(null);
  const [settings, setSettings] = useState({
    page: 1,
  });
  const getMovies = async () => {
    setLoading(true);
    setTimeout(async () => {
      if (query != null) {
        const response = await api.get("search/movie", {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            query: query,
            page: settings.page,
          },
        });
        const data = response.data;
        const moviesList = data.results;
        setMovies(moviesList);
        setSettings({
          ...settings,
          page: data.page,
          total_pages: data.total_pages,
          total_results: data.total_results,
          data_length: data.results.length,
        });
        setLoading(false);
      }
    }, 1000);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (query != null) {
      getMovies();
    } else {
      setMovies([]);
    }
  };
  const handlePaginate = (type) => {
    if (type == "next") {
      if (settings.page < settings.total_pages) {
        setSettings({
          ...settings,
          page: settings.page + 1,
        });
      }
    } else {
      if (settings.page > 1) {
        setSettings({
          ...settings,
          page: settings.page - 1,
        });
      }
    }
  };
  useEffect(() => {
    if (query != null) {
      getMovies();
    }
  }, [settings.page]);
  return (
    <div className="movies-block  min-h-screen">
      <div className="block-header flex justify-center align-middle my-4">
        <h1 className="font-bold text-4xl">Search movies :</h1>
      </div>
      <div className="pt-2 relative mx-auto text-gray-600 w-2/4">
        <input
          className="border-2 border-gray-300 w-full bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search"
          onChange={handleChange}
        />
        <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
          <Unicons.UilSearch />
        </button>
      </div>
      <div className="container">
        <div className="grid justify-center md:grid-cols-2 lg:grid-cols-2 gap-5 sm:grid-cols-1 lg:gap-7 py-10">
          {!loading ? (
            movies &&
            movies.length > 0 &&
            movies.map((movie, index) => {
              return <MovieDetails data={{ movie }} key={index} />;
            })
          ) : (
            <div className="flex justify-center align-middle">
              <h1 className="font-bold text-4xl">Loading...</h1>
            </div>
          )}
        </div>
        {movies.length > 0 && (
          <div className="flex select-none space-x-1 justify-center align-middle pb-4">
            <button
              disabled={settings.page === 1}
              onClick={() => handlePaginate("prev")}
              className="rounded-md bg-white text-slate-600 px-4 py-2 transition duration-300 hover:bg-slate-400 hover:text-white"
            >
              Previous
            </button>

            <button
              onClick={() => handlePaginate("next")}
              disabled={settings.page === settings.total_pages}
              className="rounded-md bg-white  text-slate-600 px-4 py-2 transition duration-300 hover:bg-slate-400 hover:text-white"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
