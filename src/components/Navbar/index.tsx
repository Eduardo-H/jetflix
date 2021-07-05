import { useState } from 'react';
import Image from 'next/image';
import { ActiveLink } from '../../components/ActiveLink';
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
          <ActiveLink href="/">
            <a>Home</a>
          </ActiveLink>
          
          <ActiveLink href="/movies">
            <a>Movies</a>
          </ActiveLink>

          <ActiveLink href="/tv">
            <a>TV Shows</a>
          </ActiveLink>
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