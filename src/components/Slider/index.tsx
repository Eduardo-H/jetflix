import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { 
  Navigation,
  Pagination,
  Autoplay
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
        initialSlide={0}
        navigation={true} 
        pagination={{
          "clickable": true
        }}
        autoplay={{
          "delay": 2500,
          "disableOnInteraction": false
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