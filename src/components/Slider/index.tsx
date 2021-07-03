import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { 
  Navigation,
  Pagination,
} from 'swiper/core';

SwiperCore.use([Navigation, Pagination]);

import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

import { Container, MovieInfo } from './styles';

type Movie = {
  id: string;
  title: string;
  backdrop: string;
}

interface SliderProps {
  movies: Array<Movie>;
}

export function Slider({ movies }: SliderProps) {
  return (
    <Container>
      <Swiper 
        initialSlide={1}
        navigation={true} 
        pagination={{
          "clickable": true
        }}
        loop={true}
      >
        {movies.map(movie => (
          <SwiperSlide key={movie.id}>
            <img src={movie.backdrop} alt={movie.title} />
            <MovieInfo>
              <h2>{movie.title}</h2>
            </MovieInfo>            
          </SwiperSlide>
        ))}
      </Swiper> 
    </Container>
  );
}