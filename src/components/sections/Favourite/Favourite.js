import React, { useState, useEffect } from "react";
import MovieDetails from "../../blocks/MovieDetails";
const Favourite = (props) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMovies = async () => {
    const fav = localStorage.getItem("fav");
    const favList = JSON.parse(fav);
    setMovies(favList);
    setLoading(false);
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
            movies.map((movie, index) => {
              return <MovieDetails data={{ movie }} key={index} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Favourite;
