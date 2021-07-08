import Link from 'next/link';
import { Person } from '../../pages/movies/[id]';
import { Container } from './styles';

interface ActorCardProps {
  actor: Person;
}

export function ActorCard({ actor }: ActorCardProps) {
  return (
    <Link href={`/person/${actor.id}`}>
      <Container>
        <img 
          src={actor.profile ? actor.profile : '/images/no_profile.png'} 
          alt={actor.name} 
        />

        <p>{actor.name}</p>
        <p>as <span>{actor.character}</span></p>
      </Container>
    </Link>
  );
}