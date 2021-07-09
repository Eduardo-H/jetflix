import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.min.css';
import 'swiper/components/scrollbar/scrollbar.min.css'

import { ActorCard } from '../ActorCard';
import { Person } from '../../pages/movies/[id]';

import SwiperCore, {
  Scrollbar
} from 'swiper/core';


SwiperCore.use([Scrollbar]);

interface CastSliderProps {
  cast: Array<Person>;
}

export function CastSlider({ cast }: CastSliderProps) {
  return (
    <Swiper 
      scrollbar={{ "hide": true }}
      slidesPerView={10}
      breakpoints={{
        "0": {
          "slidesPerView": 2
        },
        "650": {
          "slidesPerView": 4
        },
        "1000": {
          "slidesPerView": 6
        },
        "1300": {
          "slidesPerView": 8
        },
        "1600": {
          "slidesPerView": 10
        },
      }}
    >
      {cast.map(actor => (
        <SwiperSlide key={actor.id}>
          <ActorCard actor={actor} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}