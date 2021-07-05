import styled from 'styled-components';

interface ContainerProps {
  isActive: boolean;
}

export const Container = styled.div<ContainerProps>`
  color: ${(props) => props.isActive ? 'var(--green-500)' : 'var(--white)'};
  transition: 0.2s;

  &:hover {
    color: var(--green-500);
  }
`;