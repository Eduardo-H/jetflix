import styled from 'styled-components';

export const Container = styled.button`
  display: flex;

  border: 0;
  background: transparent;

  img {
    border-radius: 0.35rem;
    width: 200px;
    height: 300px;
  }

  transition: 0.2s ease;

  &:hover {
    filter: brightness(0.5);
  }
`;
