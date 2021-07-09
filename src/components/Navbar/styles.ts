import styled from 'styled-components';

interface NavContentProps {
  isOpen: boolean;
}

export const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 5rem;
  padding: 0rem 2rem;
  background: var(--gray-800);

  @media (max-width: 800px) {
    flex-wrap: wrap;
    height: auto;
    padding: 1rem 0;
    justify-content: space-between;
  }
`;

export const Logo = styled.button`
  border: 0;
  background: transparent;

  img {
    width: 3rem;
  }

  @media (max-width: 800px) {
    margin-left: 2rem;
  }
`;

export const NavControl = styled.button`
  border: 0;
  background: transparent;

  svg {
    display: none;
    font-size: 2rem;
    color: var(--white);
  }

  @media (max-width: 800px) {
    margin-right: 2rem;

    svg {
      display: block;
    }
  }
`;

export const NavContent = styled.div<NavContentProps>`
  width: 100%;
  max-width: 1500px;
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-left: 2rem;

  hr {
    display: none;
    border-color: var(--gray-500);
    width: 2rem;
    margin: 2rem 0;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
    overflow: hidden;

    transition: height 0.3s ease-in;
    height: ${(props) => props.isOpen ? '300px' : '0' };
    background: var(--gray-800);

    margin-left: 0;
    top: 0.75rem;

    hr {
      display: flex;
    }
  }
`;

export const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const NavActions = styled.div`
  display: flex;
  gap: 2rem;

  input {
    height: 2.5rem;
    padding: 0 0.75rem 0 2.5rem;
    color: var(--white);
    border: 0;
    border-radius: 0.4rem;

    background: var(--gray-700);
  }

  svg {
    position: absolute;
    height: 100%;
    padding: 0 0.7rem;
    min-width: 2.6rem;
    color: var(--gray-500);
  }

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`;