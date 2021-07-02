import { useState } from 'react';
import Image from 'next/image';

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
          <a href="#">Home</a>
          <a href="#">Movies</a>
          <a href="#">TV Shows</a>
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