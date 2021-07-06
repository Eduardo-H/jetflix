import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { tmdbApi } from '../../services/tmdbApi';

import { MovieList } from '../../components/MovieList';
import { TvShow as TvShowProps } from '../index';

import { Container } from './styles';

interface MoviePageProps {
  trendingShows: Array<TvShowProps>;
  comedyShows: Array<TvShowProps>;
  actionShows: Array<TvShowProps>;
  dramaShows: Array<TvShowProps>;
  documentaryShows: Array<TvShowProps>;
  familyShows: Array<TvShowProps>;
}

export default function Movie({
  trendingShows,
  comedyShows,
  actionShows,
  dramaShows,
  documentaryShows,
  familyShows
}: MoviePageProps) {
  return (
    <>
      <Head>
        <title>Jetflix | TV Shows</title>
      </Head>

      <Container>
        <h1>Trending now</h1>
        <MovieList movies={trendingShows} type="TV Show" />

        <h1>Comedy</h1>
        <MovieList movies={comedyShows} type="TV Show" />

        <h1>Action</h1>
        <MovieList movies={actionShows} type="TV Show" />

        <h1>Drama</h1>
        <MovieList movies={dramaShows} type="TV Show" />

        <h1>Romance</h1>
        <MovieList movies={documentaryShows} type="TV Show" />

        <h1>Horror</h1>
        <MovieList movies={familyShows} type="TV Show" />
      </Container>
    </>
  );
}

async function getTvShowByGenreId(genreId: number) {
  const response = await tmdbApi.get('/discover/tv', {
    params: {
      api_key: process.env.TMDB_API_KEY,
      with_genres: genreId,
      'vote_average.gte': 7,
      'release_date.lte': new Date(),
      sort_by: 'popularity.desc',
      page: Math.floor(Math.random() * 10) + 1
    }
  });

  const tvShowObject = response.data.results.map(item => {
    return {
      id: String(item.id),
      title: item.name,
      poster: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}`
    }
  });

  return tvShowObject;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const trendingShowsResponse = await tmdbApi.get('/trending/tv/week', {
    params: {
      api_key: process.env.TMDB_API_KEY
    }
  });

  const trendingShows = trendingShowsResponse.data.results.map(tvShow => {
    return {
      id: String(tvShow.id),
      title: tvShow.name,
      poster: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${tvShow.poster_path}`
    }
  });

  const comedyShows = await getTvShowByGenreId(35);
  const actionShows = await getTvShowByGenreId(10759);
  const dramaShows = await getTvShowByGenreId(18);
  const documentaryShows = await getTvShowByGenreId(99);
  const familyShows = await getTvShowByGenreId(10751);
  
  return {
    props: {
      trendingShows,
      comedyShows,
      actionShows,
      dramaShows,
      documentaryShows,
      familyShows
    }
  }
}