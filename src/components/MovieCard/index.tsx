import Link from 'next/link';
import Image from 'next/image';

import noPosterImg from '../../assets/no_poster.png';

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
        {poster ? (
          <img src={poster} alt={title} />
        ) : (
          <div className="no-poster">
            <Image src={noPosterImg} alt={title}/>
          </div>
        )}        
      </Container>
    </Link>
  )
}