import styled from 'styled-components';

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