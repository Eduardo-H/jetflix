import styled from 'styled-components';

export const Container = styled.div`
  min-height: 83vh;
  padding: 2rem 5rem;

  h2 {
    margin: 2rem 0 1rem 0;
  }

  span {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.5rem;

    padding: 4rem 0;

    svg {
      font-size: 6rem;
    }

    p {
      font-size: 1.5rem;
    }
  }
  

  @media (max-width:800px) {
    padding: 2rem 2rem;

    h1 {
      font-size: 1.75rem;
    }
  }
`;

export const ResultsList = styled.div`
  display: grid;
  grid-template-columns: repeat(8, max-content);
  gap: 1rem;

  @media (max-width:1800px) {
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

  @media (max-width:1000px) {
    grid-template-columns: repeat(3, max-content);
  }

  @media (max-width:700px) {
    grid-template-columns: repeat(2, max-content);
    gap: 0.6rem;
  }

  @media (max-width:500px) {
    justify-content: center;
    grid-template-columns: repeat(2, max-content);
  }

  @media (max-width:360px) {
    grid-template-columns: repeat(1, max-content);
  }
`;

export const ResultCard = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;

  img {
    width: 200px;
    height: 300px;
    border-radius: 0.4rem;
    cursor: pointer;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.5);
    }
  }

  p {
    font-size: 1.2rem;
  }

  @media (max-width:500px) {
    img {
      width: 150px;
      height: 220px;
    }
  }

  @media (max-width:360px) {
    img {
      width: 200px;
      height: 300px;
    }
  }
`;