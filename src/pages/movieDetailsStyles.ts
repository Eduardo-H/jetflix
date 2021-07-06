import styled from 'styled-components';

export const Container = styled.div`
  overflow-x: hidden;
  padding-bottom: 2rem;
`;

export const BackLink = styled.div`
  display: flex;
  
  padding: 2rem 5rem;

  a {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    font-size: 1.5rem;
    color: var(--white);
    transition: 0.2s;

    &:hover {
      color: var(--green-500);
    }
  }

  @media (max-width:800px) {
    padding: 2rem 2rem;
  }
`;

export const MovieContainer = styled.section`
  display: flex;
  gap: 2rem;

  padding: 2rem 5rem;

  @media (max-width: 1000px) {
    display: block;
  }

  @media (max-width:800px) {
    padding: 0rem 2rem 2rem 2rem;
  }
`;

export const MoviePoster = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;

  img {
    width: 350px;
    height: 500px;
    border-radius: 0.4rem;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    width: 90%;
    height: 3rem;
    color: var(--gray-900);
    background: var(--green-500);
    border: 0;
    border-radius: 0.3rem;

    transition: filter 0.2s;

    svg {
      font-size: 1.5rem;
    }

    &:hover {
      filter: brightness(0.8);
    }
  }

  @media (max-width:800px) {
    margin-bottom: 2rem;

    img {
      width: 250px;
      height: 350px;
    }
  }
`;

export const MovieInfo = styled.div`
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h2 {
    color: var(--green-500);
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1rem;
    text-align: justify;
  }

  @media (max-width: 800px) {
    h1 {
      font-size: 2rem;
    }
  }
`;

export const InfoRow = styled.div`
  display: grid;
  grid-template-columns: max-content max-content max-content;
  gap: 3rem;

  @media (max-width:800px) {
    grid-template-columns: max-content;
    gap: 0;
  }
`;

export const CastContainer = styled.div`
  padding-left: 4rem;
  margin-bottom: 2rem;
  
  h2 {
    font-size: 2rem;
    font-weight: 500;

    padding-left: 1rem;
    margin-bottom: 1rem;
  }

  @media (max-width:800px) {
    padding-left: 1rem;
  }
`;

export const SimilarMoviesContainer = styled.section`
  padding: 0 5rem;

  h2 {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  @media (max-width:800px) {
    padding: 0 2rem;
  }
`;

export const SimilarMovies = styled.div`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: repeat(8, max-content);

  @media (max-width:1800px) {
    justify-content: center;
    grid-template-columns: repeat(7, max-content);
  }

  @media (max-width:1650px) {
    grid-template-columns: repeat(6, max-content);
  }

  @media (max-width:1450px) {
    grid-template-columns: repeat(5, max-content);
  }

  @media (max-width:1250px) {
    grid-template-columns: repeat(4, max-content);
  }

  @media (max-width:1050px) {
    grid-template-columns: repeat(3, max-content);
  }

  @media (max-width:800px) {
    grid-template-columns: repeat(2, max-content);
  }

  @media (max-width:470px) {
    grid-template-columns: repeat(1, max-content);
  }
`;

export const NetworksContainer = styled.div`
  display: flex;
  gap: 1rem;

  img {
    width: 4rem;
  }
`;