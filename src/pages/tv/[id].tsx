import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { AiOutlinePlayCircle } from 'react-icons/ai';
import { CastSlider } from '../../components/CastSlider';
import { MovieCard } from '../../components/MovieCard';
import { BackButton } from '../../components/BackButton';
import { VideoPlayer } from '../../components/VideoPlayer';
import { formatDate } from '../../utils/formatDate';
import { verifyImageExistence } from '../../utils/verifyImageExistence';
import { usePlayer } from '../../hooks/usePlayer';
import { tmdbApi } from '../../services/tmdbApi';

import noPosterImg from '../../assets/no_poster.png';

import {
  Container,
  ProfileContainer,
  ProfileImage,
  ProfileInfo,
  InfoRow
} from '../profilePageStyles';

import {
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

interface TvShowProfileProps {
  show: TvShow;
  similarShows: Array<SimilarShow>;
}

export default function TvShowProfile({ show, similarShows }: TvShowProfileProps) {
  const { showPlayer, hidePlayer, openPlayer } = usePlayer();

  const highlightedProducers = show.producers.slice(0, 3).join(', ');
  const otherProducersCount = show.producers.length - 3;

  useEffect(() => {
    hidePlayer();
  }, []);

  return (
    <>
      <Head>
        <title>Jetflix | {show.name}</title>
      </Head>

      { showPlayer && (
        <VideoPlayer url={show.video} />
      ) }

      <BackButton />
      
      <Container>
        <ProfileContainer>
          <ProfileImage>
            {show.poster ? (
              <img src={show.poster} alt={show.name} />
            ) : (
              <div className="profile-img">
                <Image src={noPosterImg} alt={show.name} />
              </div>
            )}

            {show.video && (
              <button onClick={openPlayer}>
                <AiOutlinePlayCircle />
                Watch trailer
              </button>
            )}
          </ProfileImage>
          
          <ProfileInfo>
            <h1>{show.name}</h1>

            {show.overview && (
              <>
                <h2>Overview</h2>
                <p>{show.overview}</p>
              </>
            )}

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
                  <p>
                    {highlightedProducers}

                    { otherProducersCount > 0 && (
                      <span>+ {otherProducersCount}</span>
                    ) }
                  </p>
                </div>
              </InfoRow>

              <InfoRow>
                <div>
                  <h2>Networks</h2>
                  <NetworksContainer>
                    {show.networks.map(network => (
                      <img src={network.logo} alt={network.name} key={network.id} />                 
                    ))}
                  </NetworksContainer>
                </div>
              </InfoRow>
            </div>
          </ProfileInfo>
        </ProfileContainer>

        <CastContainer>
          <h2>Cast</h2>
          <CastSlider cast={show.cast} />
        </CastContainer>

        {similarShows.length > 0 && (
          <SimilarMoviesContainer>
            <h2>Similar Movies</h2>

            <SimilarMovies>
              {similarShows.map(show => (
                <MovieCard 
                  key={show.id}
                  id={show.id}
                  title={show.name}
                  poster={show.poster}
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
      profile: verifyImageExistence(person.profile_path, 'original')
    }  
  });

  let video = videoResponse.data.results.find(video => video.site === 'YouTube');

  if (video) {
    video = `https://www.youtube.com/watch?v=${video.key}`
  } else {
    video = null;
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
    releaseDate: formatDate(tvShowResponse.data.first_air_date),
    seasons: tvShowResponse.data.seasons.length,
    poster: verifyImageExistence(tvShowResponse.data.poster_path, 'small'),
    overview: tvShowResponse.data.overview,
    genres: tvShowResponse.data.genres.map(genre => genre.name).join(', '),
    creators: tvShowResponse.data.created_by.map(creator => creator.name).join(', '),
    cast: cast,
    producers: tvShowResponse.data.production_companies.map(producer => producer.name),
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
  const similarShows: Array<SimilarShow> = similarShowsResponse.data.results.slice(0, 16).map(tvShow => {
    return {
      id: String(tvShow.id),
      name: tvShow.name,
      poster: verifyImageExistence(tvShow.poster_path, 'small'),
    }
  });

  return {
    props: {
      show,
      similarShows
    }
  }
}