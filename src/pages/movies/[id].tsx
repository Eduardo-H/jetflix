import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { AiOutlineLeft, AiOutlinePlayCircle } from 'react-icons/ai';
import { CastSlider } from '../../components/CastSlider';
import { MovieCard } from '../../components/MovieCard';
import { tmdbApi } from '../../services/tmdbApi';
import { formatDate } from '../../utils/formatDate';
import { formatCurrency } from '../../utils/formatCurrency';

import {
  Container,
  BackLink,
  ProfileContainer,
  ProfileImage,
  ProfileInfo,
  InfoRow
} from '../profilePageStyles';

import {
  CastContainer,
  SimilarMoviesContainer,
  SimilarMovies
} from '../movieDetailsStyles';

export type Person = {
  id: string;
  name: string;
  character?: string;
  profile?: string;
}

type SimilarMovie = {
  id: string;
  title: string;
  poster: string;
}

type Movie = {
  title: string;
  releaseDate: string;
  duration?: string;
  poster: string;
  overview?: string;
  genres: Array<string>;
  directors: Array<Person>;
  cast: Array<Person>;
  producers: Array<string>;
  video: string | null;
  countries: Array<string>;
  budget: number;
  revenue: number;
}

interface MovieProfileProps {
  movie: Movie;
  similarMovies: Array<SimilarMovie>;
}

export default function MovieProfile({ movie, similarMovies }: MovieProfileProps) {
  return (
    <>
      <Head>
        <title>Jetflix | {movie.title}</title>
      </Head>

      <BackLink>
        <Link href="/">
          <a>
            <AiOutlineLeft /> Back
          </a>
        </Link>
      </BackLink>
      
      <Container>
        <ProfileContainer>
          <ProfileImage>
            <img src={movie.poster} alt={movie.title} />
            <button>
              <AiOutlinePlayCircle />
              Watch trailer
            </button>
          </ProfileImage>
          
          <ProfileInfo>
            <h1>{movie.title}</h1>

            <h2>Overview</h2>
            <p>{movie.overview}</p>

            <div>
              <InfoRow>
                <div>
                  <h2>Release Date</h2>
                  <p>{movie.releaseDate}</p>
                </div>

                <div>
                  <h2>Duration</h2>
                  <p>{movie.duration}</p>
                </div>

                <div>
                  <h2>Genres</h2>
                  <p>{movie.genres}</p>
                </div>
              </InfoRow>

              <InfoRow>
                <div>
                  <h2>Countries</h2>
                  <p>{movie.countries}</p>
                </div>

                <div>
                  <h2>Budget</h2>
                  <p>{movie.budget}</p>
                </div>

                <div>
                  <h2>Revenue</h2>
                  <p>{movie.revenue}</p>
                </div>
              </InfoRow>

              <InfoRow>
                <div>
                  <h2>Director</h2>
                  <p>
                    {movie.directors.map(director => (
                      <Link href="/" key={director.id}>
                        <a>{director.name}</a>
                      </Link>
                    ))}
                  </p>
                </div>

                <div>
                  <h2>Producers</h2>
                  <p>{movie.producers}</p>
                </div>
              </InfoRow>
            </div>
          </ProfileInfo>
        </ProfileContainer>

        <CastContainer>
          <h2>Cast</h2>
          <CastSlider cast={movie.cast} />
        </CastContainer>

        {similarMovies.length > 0 && (
          <SimilarMoviesContainer>
            <h2>Similar Movies</h2>

            <SimilarMovies>
              {similarMovies.map(movie => (
                <MovieCard 
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  poster={movie.poster}
                  type="Movie"
                />
              ))}
            </SimilarMovies>
          </SimilarMoviesContainer>
        )}
      </Container>
    </>
  );
}

function formatDuration(duration: number) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  if (hours < 0) {
    return `${minutes}m`;
  } else if (minutes < 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${minutes}m`;
  }  
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params;

  // Fetching the movie's data
  const movieResponse = await tmdbApi.get(`movie/${id}`, {
    params: {
      api_key: process.env.TMDB_API_KEY
    }
  });

  // Fetching the list of people that were credit in the movie
  const creditsResponse = await tmdbApi.get(`/movie/${id}/credits`, {
    params: {
      api_key: process.env.TMDB_API_KEY
    }
  });

  // Fetching the movie's videos
  const videoResponse = await tmdbApi.get(`/movie/${id}/videos`, {
    params: {
      api_key: process.env.TMDB_API_KEY
    }
  });

  // Building the cast array
  const cast = creditsResponse.data.cast.map(person => {
    return {
      id: String(person.id),
      name: person.name,
      character: person.character,
      profile: person.profile_path ? `https://www.themoviedb.org/t/p/original${person.profile_path}` : null
    }  
  });

  // Building the directors array
  const directors = [];
  creditsResponse.data.crew.forEach(person => {
    if (person.job === 'Director') {
      directors.push({
        id: String(person.id),
        name: person.name
      });
    }
  });

  const youtubeVideos = videoResponse.data.results.filter(video => video.site === 'YouTube');

  let video = null;
  if (youtubeVideos.lenght > 0) {
    video = `https://www.youtube.com/watch?v=${youtubeVideos[0].key}`;
  }

  // Setting all the data in a movie object
  const movie = {
    title: movieResponse.data.title,
    releaseDate: formatDate(movieResponse.data.release_date),
    duration: formatDuration(movieResponse.data.runtime),
    poster: `https://image.tmdb.org/t/p/original${movieResponse.data.poster_path}`,
    overview: movieResponse.data.overview,
    genres: movieResponse.data.genres.map(genre => genre.name).join(', '),
    directors: directors,
    cast: cast,
    producers: movieResponse.data.production_companies.map(producer => producer.name).join(', '),
    video: video,
    countries: movieResponse.data.production_countries.map(country => country.name).join(', '),
    budget: formatCurrency(movieResponse.data.budget),
    revenue: formatCurrency(movieResponse.data.revenue)
  }

  // Fetching the movies that are similar to the one highlighted
  const similarMoviesResponse = await tmdbApi.get(`/movie/${id}/similar`, {
    params: {
      api_key: process.env.TMDB_API_KEY
    }
  });

  // Building the array of similar movies
  const similarMovies: Array<SimilarMovie> = similarMoviesResponse.data.results.slice(0, 16).map(movie => {
    return {
      id: String(movie.id),
      title: movie.title,
      poster: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`,
    }
  });

  return {
    props: {
      movie,
      similarMovies
    }
  }
}