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

    border-radius: 0.4rem;
    margin-bottom: 0.5rem;
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