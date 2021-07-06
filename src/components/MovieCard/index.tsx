import Link from 'next/link';

import { Container } from './styles';

interface MovieCardProps {
  id: string;
  title: string;
  poster: string;
  type: string;
}

export function MovieCard({ id, title, poster, type }: MovieCardProps) {
  const detailsLink = type.toLowerCase() === 'movie' ? `/movies/${id}` : `/tv/${id}`;

  return (
    <Link href={detailsLink}>
      <Container>
        <img src={poster} alt={title} />
      </Container>
    </Link>
  )
}