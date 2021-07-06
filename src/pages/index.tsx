import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { MovieList } from '../components/MovieList';
import { MovieSlider } from '../components/MovieSlider';
import { tmdbApi } from '../services/tmdbApi';

import { Container } from './styles';

export type Movie = {
  id: string;
  title: string;
  poster: string;
  backdrop: string;
}

export type TvShow = {
  id: string;
  title: string;
  poster: string;
}

interface HomeProps {
  popularMovies: Array<Movie>;
  movies: Array<Movie>;
  tvShows: Array<TvShow>;
}

export default function Home({ 
  popularMovies, 
  movies, 
  tvShows 
}: HomeProps) {
  return (
    <>
      <Head>
        <title>Jetflix | Home</title>
      </Head>

      <Container>
        <MovieSlider movies={popularMovies} />

        <h1>Movies</h1>
        <MovieList movies={movies} type="Movie" />

        <h1>TV Shows</h1>
        <MovieList movies={tvShows} type="TV Show" />
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const popularMoviesResponse = await tmdbApi.get('/movie/popular', {
    params: {
      api_key: process.env.TMDB_API_KEY,
      page: 1
    }
  });

  const popularMovies = popularMoviesResponse.data.results.slice(0, 5)
  .map(movie => {
    return {
      id: String(movie.id),
      title: movie.title,
      poster: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    }
  });

  const moviesResponse = await tmdbApi.get('/discover/movie', {
    params: {
      api_key: process.env.TMDB_API_KEY,
      'release_date.lte': new Date(),
      'vote_average.gte': 5,
      sort_by: 'popularity.desc',
      page: Math.floor(Math.random() * 10) + 1
    }
  });

  const movies: Array<Movie> = moviesResponse.data.results.map(movie => {
    return {
      id: String(movie.id),
      title: movie.title,
      poster: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    }
  });

  const tvShowsResponse = await tmdbApi.get('/discover/tv', {
    params: {
      api_key: process.env.TMDB_API_KEY,
      'release_date.lte': new Date(),
      'vote_average.gte': 7,
      sort_by: 'popularity.desc',
      page: Math.floor(Math.random() * 10) + 1
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
      popularMovies,
      movies,
      tvShows
    }
  }
}