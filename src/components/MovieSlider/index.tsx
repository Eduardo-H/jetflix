import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { 
  Navigation,
  Pagination,
  Autoplay
} from 'swiper/core';

SwiperCore.use([Autoplay, Navigation, Pagination]);

import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

import { Container, MovieInfo } from './styles';

type Movie = {
  id: string;
  title: string;
  backdrop?: string;
}

interface SliderProps {
  movies: Array<Movie>;
}

export function MovieSlider({ movies }: SliderProps) {
  return (
    <Container>
      <Swiper 
        initialSlide={0}
        navigation={true} 
        pagination={{
          "clickable": true
        }}
        autoplay={{
          "delay": 3000,
          "disableOnInteraction": false
        }}
        loop={true}
      >
        {movies.map(movie => (
          <SwiperSlide key={movie.id}>
            <Link href={`/movies/${movie.id}`}>
              <a>
                <img src={movie.backdrop} alt={movie.title} />
                <MovieInfo>
                  <h2>{movie.title}</h2>
                </MovieInfo>
              </a>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper> 
    </Container>
  );
}