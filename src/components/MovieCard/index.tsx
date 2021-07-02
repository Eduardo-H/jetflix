import { AiOutlineInfoCircle } from 'react-icons/ai';

import { Container } from './styles';

interface MovieCardProps {
  title: string;
  poster: string;
}

export function MovieCard({ title, poster }: MovieCardProps) {
  return (
    <Container>
      <img src={poster} alt={title} />
    </Container>
  )
}