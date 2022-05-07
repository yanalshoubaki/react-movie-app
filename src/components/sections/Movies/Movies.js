import axios from "axios";
import React, { useState, useEffect } from "react";
import MovieDetails from "../../blocks/MovieDetails";
import api from "../../../services/api";
import _ from "lodash";
const Movies = (props) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    page: 1,
  });
  const getMovies = async () => {
    setLoading(true);
    setTimeout(async () => {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
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
    }, 1000);
  };

  useEffect(() => {
    getMovies();
  }, [settings.page]);

  return (
    <div className="movies-block  min-h-screen">
      <div className="block-header flex justify-center align-middle my-4">
        <h1 className="font-bold text-4xl">Movies list</h1>
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
              onClick={() =>
                setSettings({ ...settings, page: settings.page - 1 })
              }
              className="rounded-md bg-white text-slate-600 px-4 py-2 transition duration-300 hover:bg-slate-400 hover:text-white"
            >
              Previous
            </button>

            <button
              onClick={() =>
                setSettings({ ...settings, page: settings.page + 1 })
              }
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

export default Movies;
