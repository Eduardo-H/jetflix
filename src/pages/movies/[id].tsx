import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { AiOutlineLeft, AiOutlinePlayCircle } from 'react-icons/ai';
import { CastSlider } from '../../components/CastSlider';
import { tmdbApi } from '../../services/tmdbApi';

import { 
  Container, 
  BackLink,
  MovieContainer,
  MoviePoster,
  MovieInfo,
  InfoRow,
  CastContainer
} from './movieDetailsStyles';

export type Person = {
  id: string;
  name: string;
  character?: string;
  profile?: string;
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

interface MovieDetailsProps {
  movie: Movie;
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
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
        <MovieContainer>
          <MoviePoster>
            <img src={movie.poster} alt={movie.title} />
            <button>
              <AiOutlinePlayCircle />
              Watch trailer
            </button>
          </MoviePoster>
          
          <MovieInfo>
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
          </MovieInfo>
        </MovieContainer>

        <CastContainer>
          <h2>Cast</h2>
          <CastSlider cast={movie.cast} />
        </CastContainer>
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

  const movieResponse = await tmdbApi.get(`movie/${id}`, {
    params: {
      api_key: process.env.TMDB_API_KEY
    }
  });

  const creditsResponse = await tmdbApi.get(`/movie/${id}/credits`, {
    params: {
      api_key: process.env.TMDB_API_KEY
    }
  });

  const cast = creditsResponse.data.cast.map(person => {
    if (person.profile_path) {
      return {
        id: String(person.id),
        name: person.name,
        character: person.character,
        profile: `https://www.themoviedb.org/t/p/original${person.profile_path}`
      }
    } else {
      return {
        id: String(person.id),
        name: person.name,
        character: person.character
      }
    }    
  });

  const directors = [];
  creditsResponse.data.crew.forEach(person => {
    if (person.job === 'Director') {
      directors.push({
        id: String(person.id),
        name: person.name
      });
    }
  });

  const videoResponse = await tmdbApi.get(`/movie/${id}/videos`, {
    params: {
      api_key: process.env.TMDB_API_KEY
    }
  });

  const youtubeVideos = videoResponse.data.results.filter(video => video.site === 'YouTube');

  let video = null;
  if (youtubeVideos.lenght > 0) {
    video = `https://www.youtube.com/watch?v=${youtubeVideos[0].key}`;
  }

  const movie = {
    title: movieResponse.data.title,
    releaseDate: new Date(movieResponse.data.release_date).toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }),
    duration: formatDuration(movieResponse.data.runtime),
    poster: `https://image.tmdb.org/t/p/original${movieResponse.data.poster_path}`,
    overview: movieResponse.data.overview,
    genres: movieResponse.data.genres.map(genre => genre.name).join(', '),
    directors: directors,
    cast: cast,
    producers: movieResponse.data.production_companies.map(producer => producer.name).join(', '),
    video: video,
    countries: movieResponse.data.production_countries.map(country => country.name).join(', '),
    budget: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(movieResponse.data.budget),
    revenue: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(movieResponse.data.revenue)
  }

  return {
    props: {
      movie
    }
  }
}