import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { ActiveLink } from '../../components/ActiveLink';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';

import logoImg from '../../assets/logo.png';

import { 
  Container, 
  Logo, 
  NavControl, 
  NavContent, 
  NavItems, 
  NavActions, 
  SearchForm
} from './styles';
import { SignInButton } from '../SignInButton';


export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();

  function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (searchQuery.trim() === '')
      return;
    
    router.push(`/search?query=${searchQuery}`);
    
    setIsOpen(false);
    setSearchQuery('');
  }

  return(
    <Container>
      <Logo>
        <Link href="/">
          <a>
            <Image src={logoImg} alt="Jetflix logo" />
          </a>
        </Link>
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
            <a onClick={() => setIsOpen(false)}>Home</a>
          </ActiveLink>
          
          <ActiveLink href="/movies">
            <a onClick={() => setIsOpen(false)}>Movies</a>
          </ActiveLink>

          <ActiveLink href="/tv">
            <a onClick={() => setIsOpen(false)}>TV Shows</a>
          </ActiveLink>
        </NavItems>
        
        <hr />

        <NavActions>
          <SearchForm method="get" onSubmit={handleSearch}>
            <BiSearch />
            <input 
              type="text" 
              placeholder="Search" 
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </SearchForm>

          <SignInButton />
        </NavActions>
      </NavContent>
    </Container>
  );
}