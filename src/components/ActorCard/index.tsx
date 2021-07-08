import Image from 'next/image';
import Link from 'next/link';
import { Person } from '../../pages/movies/[id]';
import { Container } from './styles';

import noProfileImg from '../../assets/no_profile.png';

interface ActorCardProps {
  actor: Person;
}

export function ActorCard({ actor }: ActorCardProps) {
  return (
    <Link href={`/person/${actor.id}`}>
      <Container>
        { actor.profile ? (
          <img src={actor.profile} alt={actor.name} />
        ) : (
          <Image src={noProfileImg} alt={actor.name} />
        ) }

        <p>{actor.name}</p>
        <p>as <span>{actor.character}</span></p>
      </Container>
    </Link>
  );
}