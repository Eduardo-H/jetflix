import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  font-weight: 600;

  background: transparent;
  color: var(--white);

  border: 0;
  border-radius: 3rem;
  
  transition: 0.3s;

  svg {
    font-size: 1.25rem;
  }  

  &:hover {
    color: var(--green-500);
  }
`;