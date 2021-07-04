import styled from 'styled-components';

export const Container = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 2rem 0;

  span {
    color: var(--green-500);
  }

  a {
    margin-left: 5px;
    transition: color 0.2s;

    &:hover {
      color: var(--green-500);
    }
  }
`;