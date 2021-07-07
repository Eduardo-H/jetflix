import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';

import { Container } from './styles';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
}

export function ActiveLink({ children, ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter();

  return (
    <Container isActive={asPath === rest.href}>
      <Link {...rest}>
        {children}
      </Link>
    </Container>
  );
}