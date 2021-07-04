import { FaHeart } from 'react-icons/fa';

import { Container } from './styles';

export function Footer() {
  return (
    <Container>
      <p>
        Made with <span><FaHeart /></span> by 
        <a href="https://github.com/Eduardo-H" target="_blank">
          Eduardo Oliveira
        </a>
      </p>
    </Container>
  );
}