import Link from 'next/link';
import { useRouter } from 'next/router';

import { AiOutlineLeft } from 'react-icons/ai';

import { Container } from './styles';

export function BackButton() {
  const router = useRouter();

  function handleGoBackButtonClick() {
    router.back();
  }

  return (
    <Container>
      <Link href="/">
        <a onClick={handleGoBackButtonClick}>
          <AiOutlineLeft /> Back
        </a>
      </Link>
    </Container>
  );
}