import { GetServerSideProps } from 'next';

import { MovieList } from '../components/MovieList';
import { tmdbApi } from '../services/tmdbApi';

import { Container } from './styles';

type Movie = {
  id: string;
  title: string;
  poster: string;
}

type TvShow = {
  id: string;
  title: string;
  poster: string;
}

interface HomeProps {
  movies: Array<Movie>;
  tvShows: Array<TvShow>;
}

export default function Home({ movies, tvShows }: HomeProps) {
  return (
    <Container>
      <h1>Movies</h1>
      <MovieList movies={movies} />

      <h1>TV Shows</h1>
      <MovieList movies={tvShows} />
    </Container>
    
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
      title: tvShow.name,
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