import { BiLoaderAlt } from 'react-icons/bi';

import { Container } from './styles';

export function Loader() {
  return (
    <Container>
      <BiLoaderAlt />
      <p>Loading...</p>
    </Container>
  );
}