import { FaGithub } from 'react-icons/fa';

import { Container } from './styles';

export function SignInButton() {
  return (
    <Container>
      <FaGithub />
      Login with GitHub
    </Container>
  );
}