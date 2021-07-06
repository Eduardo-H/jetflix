import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { tmdbApi } from '../../services/tmdbApi';
import { Movie, TvShow } from '../index';

type Person = {
  id: string;
  name: string;
  birthday: string;
  deathDate?: string;
  gender: string;
  nationality: string;
  knownFor: string;
  photo?: string;
  movieCredits: Array<Movie>;
  tvShowCredits: Array<TvShow>;
}

interface PersonProfileProps {
  person: Person;
}

export default function PersonProfile({ person }: PersonProfileProps) {
  return (
    <>
      <Head>
        <title>Jetflix | {person.name}</title>
      </Head>
      <h1>{person.gender}</h1>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params;

  const personResponse = await tmdbApi.get(`/person/${id}`, {
    params: {
      api_key: process.env.TMDB_API_KEY
    }
  });

  const movieCreditsResponse = await tmdbApi.get(`/person/${id}/movie_credits`, {
    params: {
      api_key: process.env.TMDB_API_KEY
    }
  });

  const tvShowCreditsResponse = await tmdbApi.get(`/person/${id}/tv_credits`, {
    params: {
      api_key: process.env.TMDB_API_KEY
    }
  });

  const movieCredits = [];
  const tvShowCredits = [];

  movieCreditsResponse.data.cast.forEach(movie => {
    const poster = movie.poster_path ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` : null;

    movieCredits.push({
      id: String(movie.id),
      title: movie.title,
      poster: poster,
      backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    });
  });

  movieCreditsResponse.data.crew.forEach(movie => {
    const poster = movie.poster_path ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` : null;

    if (movie.job === 'Director') {
      movieCredits.push({
        id: String(movie.id),
        title: movie.title,
        poster: poster,
        backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      });
    }
  });

  tvShowCreditsResponse.data.cast.forEach(tvShow => {
    const poster = tvShow.poster_path ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${tvShow.poster_path}` : null;

    tvShowCredits.push({
      id: String(tvShow.id),
      name: tvShow.name,
      poster: poster
    });
  });

  tvShowCreditsResponse.data.crew.forEach(tvShow => {
    const poster = tvShow.poster_path ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${tvShow.poster_path}` : null;

    if (tvShow.job === 'Director') {
      tvShowCredits.push({
        id: String(tvShow.id),
        name: tvShow.name,
        poster: poster
      });
    }
  });

  const genders = ['Unknown', 'Female', 'Male'];

  const person = {
    id: String(personResponse.data.id),
    name: personResponse.data.name,
    birthday: personResponse.data.birthday,
    deathDate: personResponse.data.deathday,
    gender: genders[personResponse.data.gender],
    nationality: personResponse.data.place_of_birth,
    knownFor: personResponse.data.known_for_department,
    photo: personResponse.data.profile_path ?  `https://www.themoviedb.org/t/p/original${personResponse.data.profile_path}` : null,
    movieCredits,
    tvShowCredits
  }

  return {
    props: {
      person
    }
  }
}