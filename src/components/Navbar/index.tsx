import { useState } from 'react';
import Image from 'next/image';
import Link, { LinkProps } from 'next/link';

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

import logoImg from '../../assets/logo.png';

import { 
  Container, 
  Logo, 
  NavControl, 
  NavContent, 
  NavItems, 
  NavActions
} from './styles';
import { SignInButton } from '../SignInButton';


export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return(
    <Container>
      <Logo>
        <Image src={logoImg} alt="Jetflix logo" />
      </Logo>

      {
        isOpen ? (
          <NavControl onClick={() => setIsOpen(!isOpen)}>
            <AiOutlineClose />
          </NavControl>
          
        ) : (
          <NavControl onClick={() => setIsOpen(!isOpen)}>
            <AiOutlineMenu />
          </NavControl>
        )
      }

      <NavContent isOpen={isOpen}>
        <NavItems>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/movies">
            <a>Movies</a>
          </Link>
          <Link href="/">
            <a>TV Shows</a>
          </Link>
        </NavItems>
        
        <hr />

        <NavActions>
          <input type="text" placeholder="Search" />

          <SignInButton />
        </NavActions>
      </NavContent>
    </Container>
  );
}