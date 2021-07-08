import styled from 'styled-components';

export const Container = styled.div`
  overflow-x: hidden;
  padding-bottom: 2rem;
`;

export const BackLink = styled.div`
  display: flex;
  
  padding: 2rem 5rem;

  a {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    font-size: 1.5rem;
    color: var(--white);
    transition: 0.2s;

    &:hover {
      color: var(--green-500);
    }
  }

  @media (max-width:800px) {
    padding: 2rem 2rem;
  }
`;

export const ProfileContainer = styled.section`
  display: flex;
  gap: 2rem;

  padding: 2rem 5rem;

  @media (max-width: 1000px) {
    display: block;
  }

  @media (max-width:800px) {
    padding: 0rem 2rem 2rem 2rem;
  }
`;

export const ProfileImage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;

  img {
    width: 350px;
    height: 500px;
    border-radius: 0.4rem;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    width: 90%;
    height: 3rem;
    color: var(--gray-900);
    background: var(--green-500);
    border: 0;
    border-radius: 0.3rem;

    transition: filter 0.2s;

    svg {
      font-size: 1.5rem;
    }

    &:hover {
      filter: brightness(0.8);
    }
  }

  @media (max-width:800px) {
    margin-bottom: 2rem;

    img {
      width: 250px;
      height: 350px;
    }
  }
`;

export const ProfileInfo = styled.div`
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h2 {
    color: var(--green-500);
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1rem;
    text-align: justify;
  }

  @media (max-width: 800px) {
    h1 {
      font-size: 2rem;
    }
  }
`;

export const InfoRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, max-content);
  gap: 3rem;

  p span {
    position: absolute;
    font-size: 0.75rem;
    color: var(--gray-900);
    
    background: var(--green-500);
    padding: 0.2rem 0.3rem;
    margin-left: 0.5rem;
    border-radius: 0.2rem;
    transform: translateY(-10px);
  }

  @media (max-width:800px) {
    grid-template-columns: max-content;
    gap: 0;
  }
`;

export const CreditsContainer = styled.div`
  margin-bottom: 2rem;

  h2 {
    font-size: 2rem;
    font-weight: 500;
    padding-left: 5rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 800px) {
    h2 {
      padding-left: 2rem;
    }
  }
`;

interface PosterSkeletonProps {
  show: boolean;
}

export const PosterSkeleton = styled.div<PosterSkeletonProps>`
  display: ${(props) => props.show ? 'block' : 'none'};
  width: 350px;
  height: 500px;
  border-radius: 0.4rem;

  background-color: var(--gray-700);
`;