import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { AiOutlineLeft, AiOutlinePlayCircle } from 'react-icons/ai';
import { CastSlider } from '../../components/CastSlider';
import { MovieCard } from '../../components/MovieCard';
import { tmdbApi } from '../../services/tmdbApi';

import { 
  Container, 
  BackLink,
  MovieContainer,
  MoviePoster,
  MovieInfo,
  InfoRow,
  CastContainer,
  SimilarMoviesContainer,
  SimilarMovies,
  NetworksContainer
} from '../movieDetailsStyles';

export type Person = {
  id: string;
  name: string;
  character?: string;
  profile?: string;
}

type SimilarShow = {
  id: string;
  name: string;
  poster: string;
}

type Network = {
  id: string;
  name: string;
  logo: string;
}

type TvShow = {
  name: string;
  releaseDate: string;
  seasons: number;
  poster: string;
  overview?: string;
  genres: Array<string>;
  creators: Array<string>;
  cast: Array<Person>;
  producers: Array<string>;
  video: string | null;
  countries: Array<string>;
  status: string;
  networks: Array<Network>;
}

interface MovieDetailsProps {
  show: TvShow;
  similarShows: Array<SimilarShow>;
}

export default function MovieDetails({ show, similarShows }: MovieDetailsProps) {
  return (
    <>
      <Head>
        <title>Jetflix | {show.name}</title>
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
            <img src={show.poster} alt={show.name} />
            <button>
              <AiOutlinePlayCircle />
              Watch trailer
            </button>
          </MoviePoster>
          
          <MovieInfo>
            <h1>{show.name}</h1>

            <h2>Overview</h2>
            <p>{show.overview}</p>

            <div>
              <InfoRow>
                <div>
                  <h2>Release Date</h2>
                  <p>{show.releaseDate}</p>
                </div>

                <div>
                  <h2>Seasons</h2>
                  <p>{show.seasons}</p>
                </div>

                <div>
                  <h2>Genres</h2>
                  <p>{show.genres}</p>
                </div>
              </InfoRow>

              <InfoRow>
                <div>
                  <h2>Countries</h2>
                  <p>{show.countries}</p>
                </div>

                <div>
                  <h2>Status</h2>
                  <p>{show.status}</p>
                </div>

                <div>
                  <h2>Creator(s)</h2>
                  <p>{show.creators}</p>
                </div>
              </InfoRow>

              <InfoRow>
                <div>
                  <h2>Producers</h2>
                  <p>{show.producers}</p>
                </div>
              </InfoRow>

              <InfoRow>
                <div>
                  <h2>Networks</h2>
                  <NetworksContainer>
                    {show.networks.map(network => (
                      <Link href="/" key={network.id}>
                        <img src={network.logo} alt={network.name} />
                      </Link>                    
                    ))}
                  </NetworksContainer>
                  
                </div>
              </InfoRow>
            </div>
          </MovieInfo>
        </MovieContainer>

        <CastContainer>
          <h2>Cast</h2>
          <CastSlider cast={show.cast} />
        </CastContainer>

        {similarShows.length > 0 && (
          <SimilarMoviesContainer>
            <h2>Similar Movies</h2>

            <SimilarMovies>
              {similarShows.map(movie => (
                <MovieCard 
                  key={movie.id}
                  id={movie.id}
                  title={movie.name}
                  poster={movie.poster}
                  type="TV Show"
                />
              ))}
            </SimilarMovies>
          </SimilarMoviesContainer>
        )}
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params;

  // Fetching the show's data
  const tvShowResponse = await tmdbApi.get(`tv/${id}`, {
    params: {
      api_key: process.env.TMDB_API_KEY
    }
  });

  // Fetching the list of people that were credit in the TV Show
  const creditsResponse = await tmdbApi.get(`/tv/${id}/credits`, {
    params: {
      api_key: process.env.TMDB_API_KEY
    }
  });

  // Fetching the show's videos
  const videoResponse = await tmdbApi.get(`/tv/${id}/videos`, {
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

  const youtubeVideos = videoResponse.data.results.filter(video => video.site === 'YouTube');

  let video = null;
  if (youtubeVideos.lenght > 0) {
    video = `https://www.youtube.com/watch?v=${youtubeVideos[0].key}`;
  }

  const networks = tvShowResponse.data.networks.map(network => {
    return {
      id: String(network.id),
      name: network.name,
      logo: network.logo_path ? `https://www.themoviedb.org/t/p/h50_filter(negate,000,666)${network.logo_path}` : null
    }
  })

  // Setting all the data in a TV Show object
  const show = {
    name: tvShowResponse.data.name,
    releaseDate: new Date(tvShowResponse.data.release_date).toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }),
    seasons: tvShowResponse.data.seasons.length,
    poster: `https://image.tmdb.org/t/p/original${tvShowResponse.data.poster_path}`,
    overview: tvShowResponse.data.overview,
    genres: tvShowResponse.data.genres.map(genre => genre.name).join(', '),
    creators: tvShowResponse.data.created_by.map(creator => creator.name).join(', '),
    cast: cast,
    producers: tvShowResponse.data.production_companies.map(producer => producer.name).join(', '),
    video: video,
    countries: tvShowResponse.data.production_countries.map(country => country.name).join(', '),
    status: tvShowResponse.data.status,
    networks: networks
  }

  // Fetching the TV Show that are similar to the one highlighted
  const similarShowsResponse = await tmdbApi.get(`/tv/${id}/similar`, {
    params: {
      api_key: process.env.TMDB_API_KEY
    }
  });

  // Building the array of similar TV Shows
  const similarShows: Array<SimilarShow> = similarShowsResponse.data.results.slice(0, 16).map(movie => {
    return {
      id: String(movie.id),
      name: movie.name,
      poster: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`,
    }
  });

  return {
    props: {
      show,
      similarShows
    }
  }
}