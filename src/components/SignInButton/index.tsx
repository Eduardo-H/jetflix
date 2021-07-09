import { signIn, signOut, useSession } from 'next-auth/client';

import { FaGithub } from 'react-icons/fa';

import { Container } from './styles';

export function SignInButton() {
  const [session] = useSession();

  return session ? (
    <Container onClick={() => signOut()}>
      <img src={session.user.image} alt={session.user.name} />
      {session.user.name.split(' ')[0]}
    </Container>
  ) : (
    <Container onClick={() => signIn('github')}>
      <FaGithub />
      Sing in with GitHub
    </Container>
  )
}