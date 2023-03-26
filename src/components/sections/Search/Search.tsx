import React, {
  useState,
  useEffect,
  EventHandler,
  ChangeEventHandler,
  ChangeEvent,
} from 'react';
import MovieDetails from '../../blocks/MovieDetails';
import { useQuery } from 'react-query';
import useClient from '../../../providers/hooks/useClient';
import { MovieResponse } from '../../../providers/types';
import { map } from 'lodash';
const Search = () => {
  const client = useClient();
  const [movies, setMovies] = useState<MovieResponse['results']>([]);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<
    Pick<MovieResponse, 'page' | 'total_pages' | 'total_results'>
  >({
    page: 1,
    total_pages: 0,
    total_results: 0,
  });
  const [query, setQuery] = useState<string | null>(null);

  const getMoviesQuery = useQuery({
    queryKey: ['search', settings.page, query],
    queryFn: async () => {
      const data = await client.get<MovieResponse>('search/movie', {
        params: {
          api_key: import.meta.env.VITE_APP_API_KEY,
          page: settings.page,
          query: query,
        },
      });
      return data.data;
    },
    onSuccess: (data) => {
      const moviesList = data.results;
      setMovies(moviesList);
      setSettings({
        ...settings,
        page: data.page,
        total_pages: data.total_pages,
        total_results: data.total_results,
      });
      setLoading(false);
    },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    if (query != null) {
      getMoviesQuery.refetch();
    } else {
      setMovies([]);
    }
  };
  const handlePaginate = (type: 'next' | 'prev') => {
    if (type == 'next') {
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
      getMoviesQuery.refetch();
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
        <button
          type="submit"
          className="absolute right-0 top-0 mt-5 mr-4"
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
          ;
        </button>
      </div>
      <div className="container">
        <div className="grid justify-center md:grid-cols-2 lg:grid-cols-2 gap-5 sm:grid-cols-1 lg:gap-7 py-10">
          {!loading ? (
            movies &&
            movies.length > 0 &&
            map(movies, (movie, index) => {
              return (
                <MovieDetails
                  data={{ movie }}
                  key={index}
                />
              );
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
              onClick={() => handlePaginate('prev')}
              className="rounded-md bg-white text-slate-600 px-4 py-2 transition duration-300 hover:bg-slate-400 hover:text-white"
            >
              Previous
            </button>

            <button
              onClick={() => handlePaginate('next')}
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
