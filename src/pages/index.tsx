import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { MovieList } from '../components/MovieList';
import { MovieSlider } from '../components/MovieSlider';
import { tmdbApi } from '../services/tmdbApi';
import { verifyImageExistence } from '../utils/verifyImageExistence';

import { Container } from '../styles/home';

export type Movie = {
  id: string;
  title: string;
  poster: string;
  backdrop?: string;
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

  const params = {
    api_key: process.env.TMDB_API_KEY,
    'release_date.lte': new Date(),
    'vote_average.gte': 7,
    sort_by: 'popularity.desc',
    page: Math.floor(Math.random() * 10) + 1
  }

  const moviesResponse = await tmdbApi.get('/discover/movie', {params});
  const tvShowsResponse = await tmdbApi.get('/discover/tv', {params});

  const popularMovies = popularMoviesResponse.data.results.slice(0, 5)
  .map(movie => {
    return {
      id: String(movie.id),
      title: movie.title,
      poster: verifyImageExistence(movie.poster_path, 'Small'),
      backdrop: verifyImageExistence(movie.backdrop_path, 'Original')
    }
  });

  const movies: Array<Movie> = moviesResponse.data.results.map(movie => {
    return {
      id: String(movie.id),
      title: movie.title,
      poster: verifyImageExistence(movie.poster_path, 'Small')
    }
  });

  const tvShows: Array<Movie> = tvShowsResponse.data.results.map(tvShow => {
    return {
      id: String(tvShow.id),
      title: tvShow.name,
      poster: verifyImageExistence(tvShow.poster_path, 'Small')
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