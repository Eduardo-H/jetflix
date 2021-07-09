import styled from 'styled-components';

export const Container = styled.main`
  overflow-x: hidden;
  padding-bottom: 2rem;

  h1 {
    font-weight: 500;
    padding: 1rem 5rem;
    margin-top: 1rem;
  }

  @media (max-width: 800px) {
    h1 {
      padding: 1rem 2rem;
    }
  }
`;