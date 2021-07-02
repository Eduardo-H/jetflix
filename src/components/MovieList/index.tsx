import { useState } from 'react';

import { MovieCard } from '../MovieCard';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import { 
  Container, 
  ListControllerLeft, 
  ListControllerRight 
} from './styles';


type Movie = {
  id: string;
  title: string;
  poster: string;
}

interface MovieListInterface {
  movies: Array<Movie>;
}

export function MovieList({ movies }: MovieListInterface) {
  const [axisX, setAxisX] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  function handleLeftArrowClick() {
    let x = axisX + Math.round(window.innerWidth / 2);

    if (x > 0) {
      x = 0;
      setShowLeftArrow(false);
    } else {
      setShowRightArrow(true);
    }

    setAxisX(x);
  }

  function handleRightArrowClick() {
    const listWidth = (movies.length) * 220;
    let x = axisX - Math.round(window.innerWidth / 2);

    if ((window.innerWidth - listWidth) > x) {
      const blankSpace = window.innerWidth > 800 ? 80 : 16;

      x = (window.innerWidth - listWidth) - blankSpace;
      setShowRightArrow(false);
    } else {
      setShowLeftArrow(true);
    }

    setAxisX(x);
  }

  return (
    <Container axisX={axisX}>
      <ListControllerLeft 
        onClick={handleLeftArrowClick} 
        show={showLeftArrow}
      >
        <BsChevronLeft />
      </ListControllerLeft>      
      
      {
        movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            title={movie.title} 
            poster={movie.poster}
          />
        ))
      }
      
      <ListControllerRight 
        onClick={handleRightArrowClick} 
        show={showRightArrow}
      >
        <BsChevronRight />
      </ListControllerRight>
    </Container>
  );
}