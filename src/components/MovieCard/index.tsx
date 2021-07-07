import Link from 'next/link';

import { Container } from './styles';

interface MovieCardProps {
  id: string;
  title: string;
  poster: string | null;
  type: string;
}

export function MovieCard({ id, title, poster, type }: MovieCardProps) {
  const detailsLink = type.toLowerCase() === 'movie' ? `/movies/${id}` : `/tv/${id}`;

  return (
    <Link href={detailsLink}>
      <Container>
        <img 
          src={poster ? poster : '/images/no_poster.png'} 
          alt={title} 
        />
      </Container>
    </Link>
  )
}