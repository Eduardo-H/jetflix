import styled from 'styled-components';

interface ContainerProps {
  axisX: number;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;

  gap: 1rem;

  padding-left: 5rem;

  margin-left: ${(props) => props.axisX}px;

  transition: all 0.3s ease;

  @media (max-width:800px) {
    padding-left: 2rem;
  }

  .list-controller {
    position: absolute;
    height: 300px;
    padding: 0 2rem;
    
    align-items: center;
    justify-content: center;

    background: rgba(0, 0, 0, 0.6);
    z-index: 99;

    cursor: pointer;
    opacity: 0;

    transition: opacity 0.2s ease-in;

    svg {
      position: absolute;
      font-size: 2rem;
    }
  }

  &:hover {
    .list-controller {
      opacity: 1;
    }
  }

  @media (max-width:800px) {
    .list-controller {
      opacity: 1;
    }
  }
`;

interface ListControllerProps {
  show: boolean;
}

export const ListControllerLeft = styled.div<ListControllerProps>`
  left: 0;
  display: ${(props) => props.show ? 'flex' : 'none'};
`;

export const ListControllerRight = styled.div<ListControllerProps>`
  right: 0;
  display: ${(props) => props.show ? 'flex' : 'none'};
`;