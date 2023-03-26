import React, { useState, useEffect } from 'react';
import MovieDetails from '../../blocks/MovieDetails';
import { MovieResponse, MovieResult } from '../../../providers/types';
import { map } from 'lodash';
const Favourite = () => {
  const [movies, setMovies] = useState<MovieResponse['results']>([]);

  const getMovies = async () => {
    const fav = localStorage.getItem('fav') as string;
    const favList: MovieResult[] = JSON.parse(fav);
    setMovies(favList);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="favourite-block min-h-screen max-w-6xl mx-auto">
      <div className="block-header flex justify-center align-middle my-4">
        <h1 className="font-bold text-4xl">Favourite</h1>
      </div>
      <div className="container">
        <div className="grid justify-center md:grid-cols-2 lg:grid-cols-2 gap-5 sm:grid-cols-1 lg:gap-7 py-10">
          {movies &&
            movies.length > 0 &&
            map(movies, (movie, index) => {
              return (
                <MovieDetails
                  data={{ movie }}
                  key={index}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Favourite;
