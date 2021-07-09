import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import { BiMovie } from 'react-icons/bi';
import { verifyImageExistence } from '../../utils/verifyImageExistence';
import { Movie, TvShow } from '..';
import { tmdbApi } from '../../services/tmdbApi';

import noPosterImg from '../../assets/no_poster.png';
import noProfileImg from '../../assets/no_profile.png';

import { Container, ResultsList, ResultCard } from './styles';

type Person = {
  id: string;
  name: string;
  profile?: string;
}

interface SearchProps {
  query: string;
  totalResults: number;
  movies: Array<Movie>;
  tvShows: Array<TvShow>;
  people: Array<Person>;
}

export default function Search({ 
  query, 
  totalResults, 
  movies, 
  tvShows, 
  people 
}: SearchProps) {
  return (
    <>
      <Head>
        <title>Jetflix | Search</title>
      </Head>

      <Container>
        <h1>Results for "{query}"</h1>

        {totalResults > 0 ? (
          <>
            {movies.length > 0 && (
              <>
                <h2>Movies</h2>

                <ResultsList>
                  { movies.map(movie => (
                    <ResultCard key={movie.id}>
                      <Link href={`/movies/${movie.id}`}>
                        <a>
                          {movie.poster ? (
                            <img src={movie.poster} alt={movie.title} />
                          ) : (
                            <Image src={noPosterImg} alt={movie.title} />
                          )}
                        </a>
                      </Link>
                    </ResultCard>
                  )) }
                </ResultsList>
              </>
            )}

            {tvShows.length > 0 && (
              <>
                <h2>TV Shows</h2>
                
                <ResultsList>
                  { tvShows.map(tvShow => (
                    <ResultCard key={tvShow.id}>
                      <Link href={`/tv/${tvShow.id}`}>
                        <a>
                          {tvShow.poster ? (
                            <img src={tvShow.poster} alt={tvShow.title} />
                          ) : (
                            <Image src={noPosterImg} alt={tvShow.title} />
                          )}
                        </a>
                      </Link>
                    </ResultCard>
                  )) }
                </ResultsList>
              </>
            )}

            {people.length > 0 && (
              <>
                <h2>People</h2>

                <ResultsList>
                  { people.map(person => (
                    <ResultCard key={person.id}>
                      <Link href={`/person/${person.id}`}>
                        <a>
                          {person.profile ? (
                            <img src={person.profile} alt={person.name} />
                          ) : (
                            <Image src={noProfileImg} alt={person.name} />
                          )}
                        </a>
                      </Link>
                      
                      <p>{person.name}</p>
                    </ResultCard>
                  )) }
                </ResultsList>
              </>
            )}
          </>
        ) : (
          <span>
            <BiMovie />
            <p>Nothing was found</p>
          </span>
        )}
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const searchQuery = query.query;

  const response = await tmdbApi.get('/search/multi', {
    params: {
      api_key: process.env.TMDB_API_KEY,
      query: searchQuery
    }
  });

  const movies = [];
  const tvShows = [];
  const people = [];

  response.data.results.forEach(item => {
    switch (item.media_type) {
      case 'movie':
        movies.push({
          id: String(item.id),
          title: item.title,
          poster: verifyImageExistence(item.poster_path, 'small')
        });

        break;
      case 'tv':
        tvShows.push({
          id: String(item.id),
          title: item.name,
          poster: verifyImageExistence(item.poster_path, 'small')
        });

        break;
      case 'person':
        people.push({
          id: String(item.id),
          name: item.name,
          profile: verifyImageExistence(item.profile_path, 'small')
        });

        break;
      default:
        break;
    }
  });

  return {
    props: {
      query: searchQuery,
      totalResults: response.data.total_results,
      movies,
      tvShows,
      people
    }
  }
}