import styled from 'styled-components';

export const Container = styled.div`
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