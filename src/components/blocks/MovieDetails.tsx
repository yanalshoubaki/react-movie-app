import React from 'react';
import { useState, useEffect } from 'react';
import { MovieResult } from '../../providers/types';
import { filter } from 'lodash';

type MovieDetailsProps = {
  data: {
    movie: MovieResult;
  };
};

const MovieDetails = ({ data: { movie } }: MovieDetailsProps) => {
  const baseImageURL = 'https://image.tmdb.org/t/p/original';
  const [isFav, setIsFav] = useState(false);
  const checkIfInFav = () => {
    const fav = localStorage.getItem('fav');
    if (fav) {
      const favMovies = JSON.parse(fav);
      const check = filter(favMovies, (row) => row.id == movie.id);
      if (check.length > 0) {
        setIsFav(true);
      }
    } else {
      return false;
    }
  };

  const addToFav = () => {
    const fav = localStorage.getItem('fav');
    if (fav) {
      const favMovies: MovieResult[] = JSON.parse(fav);
      const check = filter(favMovies, (row) => row.id == movie.id);
      if (check.length > 0) {
        const movies = filter(favMovies, (row) => row.id != movie.id);
        localStorage.setItem('fav', JSON.stringify(movies));
        setIsFav(false);
      } else {
        favMovies.push(movie);
        localStorage.setItem('fav', JSON.stringify(favMovies));
        setIsFav(true);
      }
    } else {
      const movies = [movie];
      localStorage.setItem('fav', JSON.stringify(movies));
      setIsFav(true);
    }
  };

  useEffect(() => {
    checkIfInFav();
  }, []);

  return (
    <div className="py-3 sm:max-w-xl sm:mx-auto mb-10">
      <div className="bg-white shadow-lg border-gray-100 hover:translate-y-2 hover:shadow-xl transition-all border sm:rounded-3xl p-8 flex space-x-8">
        <div className="overflow-visible w-1/2 relative">
          <span
            onClick={() => addToFav()}
            className={`addToFav absolute top-4 cursor-pointer right-4 rounded-full p-2 transition ${
              isFav
                ? 'bg-red-500 text-white border-white border'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </span>
          <img
            className="rounded-3xl shadow-lg"
            src={baseImageURL + movie.poster_path}
            alt={movie.title}
          />
        </div>
        <div className="flex flex-col w-1/2 space-y-4">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-bold">{movie.title}</h2>
            <div
              className={`${
                movie.vote_average > 7
                  ? 'bg-green-400 text-white'
                  : movie.vote_average < 6
                  ? 'bg-red-400'
                  : 'bg-yellow-400'
              } font-bold rounded-xl p-2`}
            >
              {movie.vote_average}
            </div>
          </div>
          <div>
            <div className="text-lg text-gray-800">{movie.release_date}</div>
          </div>
          <p className="text-gray-400 text-sm  overflow-y-hidden">
            {movie.overview.slice(0, 100)}...
          </p>
        </div>
      </div>
    </div>
  );
};
export default MovieDetails;
