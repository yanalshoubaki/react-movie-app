import axios from 'axios';

const useClient = () => {
  const client = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
  });

  return client;
};

export default useClient;
