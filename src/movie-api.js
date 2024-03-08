import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const options = {
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZGY1NWJiNDMwMGJjN2EwYWMwNDMxNmNmN2YyYzdhZiIsInN1YiI6IjY1ZWIwNWJjMzM5NmI5MDE4Njg3MDliNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zYzpUEU194UWiO2XwKTkfqskrVCPmVKPzgvBFmRrSzw',
  },
};

export const getTrendingMovies = async () => {
  const response = await axios.get(
    '/trending/movie/day?language=en-US',
    options
  );

  return response.data.results;
};

export const getMovieDetailsById = async id => {
  const response = await axios.get(`/movie/${id}?language=en-US`, options);
  console.log(response.data);
  return response.data;
};

export const getCast = async id => {
  const response = await axios.get(
    `/movie/${id}/credits?language=en-US`,
    options
  );
  console.log(response.data);
  return response.data;
};

export const getReviews = async id => {
  const response = await axios.get(
    `/movie/${id}/reviews?language=en-US`,
    options
  );

  return response.data.results;
};
