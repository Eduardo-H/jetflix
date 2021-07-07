import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { tmdbApi } from '../../services/tmdbApi';

import { MovieList } from '../../components/MovieList';
import { Movie as MovieProps } from '../index';

import { Container } from './styles';
import { verifyImageExistence } from '../../utils/verifyImageExistence';

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
    <>
      <Head>
        <title>Jetflix | Movies</title>
      </Head>

      <Container>
        <h1>Trending now</h1>
        <MovieList movies={trendingMovies} type="Movie" />

        <h1>Comedy</h1>
        <MovieList movies={comedyMovies} type="Movie" />

        <h1>Action</h1>
        <MovieList movies={actionMovies} type="Movie" />

        <h1>Drama</h1>
        <MovieList movies={dramaMovies} type="Movie" />

        <h1>Romance</h1>
        <MovieList movies={romanceMovies} type="Movie" />

        <h1>Horror</h1>
        <MovieList movies={horrorMovies} type="Movie" />
      </Container>
    </>
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
      poster: verifyImageExistence(item.poster_path, 'small')
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
      poster: verifyImageExistence(movie.poster_path, 'small')
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