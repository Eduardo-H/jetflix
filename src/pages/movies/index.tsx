import { GetServerSideProps } from 'next';
import { tmdbApi } from '../../services/tmdbApi';

import { MovieList } from '../../components/MovieList';
import { Movie as MovieProps } from '../index';

import { Container } from './styles';

interface MoviePageProps {
  trendingMovies: Array<MovieProps>;
  comedyMovies: Array<MovieProps>;
  actionMovies: Array<MovieProps>;
  dramaMovies: Array<MovieProps>;
  romanceMovies: Array<MovieProps>;
  horrorMovies: Array<MovieProps>;
}

export default function Movie({
  trendingMovies,
  comedyMovies,
  actionMovies,
  dramaMovies,
  romanceMovies,
  horrorMovies
}: MoviePageProps) {
  return (
    <Container>
      <h1>Trending now</h1>
      <MovieList movies={trendingMovies} />

      <h1>Comedy</h1>
      <MovieList movies={comedyMovies} />

      <h1>Action</h1>
      <MovieList movies={actionMovies} />

      <h1>Drama</h1>
      <MovieList movies={dramaMovies} />

      <h1>Romance</h1>
      <MovieList movies={romanceMovies} />

      <h1>Horror</h1>
      <MovieList movies={horrorMovies} />
    </Container>
  );
}

async function getMoviesByGenreId(genreId: number) {
  const response = await tmdbApi.get('/discover/movie', {
    params: {
      api_key: process.env.TMDB_API_KEY,
      with_genres: genreId,
      'release_date.lte': new Date(),
      sort_by: 'popularity.desc',
      page: Math.floor(Math.random() * 10) + 1
    }
  });

  const movieObject = response.data.results.map(item => {
    return {
      id: String(item.id),
      title: item.title,
      poster: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/original${item.backdrop_path}`
    }
  });

  return movieObject;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const trendingMoviesResponse = await tmdbApi.get('/trending/movie/week', {
    params: {
      api_key: process.env.TMDB_API_KEY
    }
  });

  const trendingMovies = trendingMoviesResponse.data.results.map(movie => {
    return {
      id: String(movie.id),
      title: movie.title,
      poster: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    }
  });

  const comedyMovies = await getMoviesByGenreId(35);
  const actionMovies = await getMoviesByGenreId(28);
  const dramaMovies = await getMoviesByGenreId(18);
  const romanceMovies = await getMoviesByGenreId(10749);
  const horrorMovies = await getMoviesByGenreId(27);
  
  return {
    props: {
      trendingMovies,
      comedyMovies,
      actionMovies,
      dramaMovies,
      romanceMovies,
      horrorMovies
    }
  }
}