import styled from 'styled-components';

export const Container = styled.button`
  display: flex;

  border: 0;
  background: transparent;

  img, .no-poster {
    border-radius: 0.35rem;
    width: 200px;
    height: 300px;
  }

  transition: 0.2s ease;

  &:hover {
    filter: brightness(0.5);
  }

  @media (max-width: 768px) {
    img, .no-poster {
      border-radius: 0.35rem;
      width: 130px;
      height: 200px;
    }
  }
`;