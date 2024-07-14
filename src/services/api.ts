import axios from 'axios';

const API_KEY = 'd8e0e613fcbf81cf57bfce1baf6bd90c';
const API_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGUwZTYxM2ZjYmY4MWNmNTdiZmNlMWJhZjZiZDkwYyIsIm5iZiI6MTcyMDg5NjM5My42ODk5NzUsInN1YiI6IjY2OGQxODhhNDU0ZmY4OGIxNDBkMWM4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RTXGEBT87wHoFvqYMlKmQUfHjUkNTwPMQfgji7OjtPk';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${API_ACCESS_TOKEN}`,
  },
  params: {
    api_key: API_KEY,
  },
});

export default api;
