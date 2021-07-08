import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 82vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  svg {
    width: 4rem;
    height: 4rem;

    animation: spin 1s infinite linear;
  }

  @keyframes spin {
    from {
      transform:rotate(0deg);
    }
    to {
      transform:rotate(360deg);
    }
  }
`;