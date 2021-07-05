import Link from 'next/link';

import { Container } from './styles';

interface MovieCardProps {
  id: string;
  title: string;
  poster: string;
}

export function MovieCard({ id, title, poster }: MovieCardProps) {
  return (
    <Link href={`/movies/${id}`}>
      <Container>
        <img src={poster} alt={title} />
      </Container>
    </Link>
  )
}