import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { tmdbApi } from '../../services/tmdbApi';
import { BackButton } from '../../components/BackButton';
import { Movie, TvShow } from '../index';
import { formatDate } from '../../utils/formatDate';

import {
  Container,
  ProfileContainer,
  ProfileImage,
  ProfileInfo,
  InfoRow,
  CreditsContainer
} from '../profilePageStyles';
import { MovieList } from '../../components/MovieList';
import { verifyImageExistence } from '../../utils/verifyImageExistence';

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
  biography: string;
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

      <BackButton />
      
      <Container>
        <ProfileContainer>
          <ProfileImage>
            <img src={person.photo} alt={person.name} />
          </ProfileImage>
          
          <ProfileInfo>
            <h1>{person.name}</h1>

            <h2>Biography</h2>
            <p>{person.biography}</p>

            <div>
              <InfoRow>
                <div>
                  <h2>Birthday</h2>
                  <p>{person.birthday}</p>
                </div>

                <div>
                  <h2>Nationality</h2>
                  <p>{person.nationality}</p>
                </div>

                <div>
                  <h2>Gender</h2>
                  <p>{person.gender}</p>
                </div>
              </InfoRow>

              <InfoRow>
                <div>
                  <h2>Known for</h2>
                  <p>{person.knownFor}</p>
                </div>

                {person.deathDate && (
                  <div>
                    <h2>Death Date</h2>
                    <p>{person.deathDate}</p>
                  </div>
                )}
              </InfoRow>
            </div>
          </ProfileInfo>
        </ProfileContainer>

        {person.movieCredits.length > 0 && (
          <CreditsContainer>
            <h2>Movie Credits</h2>

            <MovieList movies={person.movieCredits} type="Movie" />
          </CreditsContainer>
        )}

        {person.tvShowCredits.length > 0 && (
          <CreditsContainer>
            <h2>TV Show Credits</h2>

            <MovieList movies={person.tvShowCredits} type="TV Show" />
          </CreditsContainer>
        )}
      </Container>
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
    const repeatedMovie = movieCredits.some(item => item.id === String(movie.id));

    if (!repeatedMovie) {
      movieCredits.push({
        id: String(movie.id),
        title: movie.title,
        poster: verifyImageExistence(movie.poster_path, 'small')
      });
    }    
  });

  movieCreditsResponse.data.crew.forEach(movie => {
    const repeatedMovie = movieCredits.some(item => item.id === String(movie.id));

    if (movie.job === 'Director' && !repeatedMovie) {
      movieCredits.push({
        id: String(movie.id),
        title: movie.title,
        poster: verifyImageExistence(movie.poster_path, 'small')
      });
    }
  });


  tvShowCreditsResponse.data.cast.forEach(tvShow => {
    const repeatedShow = tvShowCredits.some(item => item.id === String(tvShow.id));

    if (!repeatedShow) {
      tvShowCredits.push({
        id: String(tvShow.id),
        name: tvShow.name,
        poster: verifyImageExistence(tvShow.poster_path, 'small')
      });
    }
  });

  tvShowCreditsResponse.data.crew.forEach(tvShow => {
    const repeatedShow = tvShowCredits.some(item => item.id === String(tvShow.id));

    if (tvShow.job === 'Director' && !repeatedShow) {
      tvShowCredits.push({
        id: String(tvShow.id),
        name: tvShow.name,
        poster: verifyImageExistence(tvShow.poster_path, 'small')
      });
    }
  });

  const genders = ['Unknown', 'Female', 'Male'];

  const person = {
    id: String(personResponse.data.id),
    name: personResponse.data.name,
    birthday: formatDate(personResponse.data.birthday),
    deathDate: personResponse.data.deathday ? formatDate(personResponse.data.deathday) : null,
    gender: genders[personResponse.data.gender],
    nationality: personResponse.data.place_of_birth,
    knownFor: personResponse.data.known_for_department,
    photo: verifyImageExistence(personResponse.data.profile_path, 'original'),
    movieCredits,
    tvShowCredits,
    biography: personResponse.data.biography
  }

  return {
    props: {
      person
    }
  }
}