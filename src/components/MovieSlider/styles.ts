import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-height: 600px;

  img {
    object-fit: cover;
    width: 100%;
    max-height: 600px;
    filter: brightness(0.5);
  }
`;

export const MovieInfo = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  text-align: center;
  
  h2 {
    font-size: 4rem;
    font-weight: 500;
  }

  @media (max-width:800px) {
    h2 {
      font-size: 2rem;
    }
  }
`;