import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  
  margin-bottom: 1rem;

  img {
    width: 140px;
    height: 200px;
    cursor: pointer;

    border-radius: 0.4rem;
    margin-bottom: 0.5rem;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.5);
    }
  }

  p, span {
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    color: var(--gray-500);
  }
`;