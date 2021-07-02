import { GetServerSideProps } from 'next';
import { tmdbApi } from '../services/tmdbApi';

type Movie = {
  id: string;
  title: string;
  poster: string;
}

type TvShow = {
  id: string;
  name: string;
  poster: string;
}

interface HomeProps {
  movies: Array<Movie>;
  tvShows: Array<TvShow>;
}

export default function Home({ movies, tvShows }: HomeProps) {
  return (
    <h1>Jetflix</h1>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const moviesResponse = await tmdbApi.get('/movie/popular', {
    params: {
      api_key: process.env.TMDB_API_KEY
    }
  });

  const movies: Array<Movie> = moviesResponse.data.results.map(movie => {
    return {
      id: String(movie.id),
      title: movie.title,
      poster: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`
    }
  });

  const tvShowsResponse = await tmdbApi.get('/tv/popular', {
    params: {
      api_key: process.env.TMDB_API_KEY
    }
  });

  const tvShows: Array<Movie> = tvShowsResponse.data.results.map(tvShow => {
    return {
      id: String(tvShow.id),
      name: tvShow.name,
      poster: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${tvShow.poster_path}`
    }
  }); 

  return {
    props: {
      movies,
      tvShows
    }
  }
}