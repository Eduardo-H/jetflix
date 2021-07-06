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
          "slidesPerView": 1,
          "spaceBetween": 0
        },
        "350": {
          "slidesPerView": 2,
          "spaceBetween": 20
        },
        "450": {
          "slidesPerView": 3,
          "spaceBetween": 20
        },
        "768": {
          "slidesPerView": 5,
          "spaceBetween": 30
        },
        "1024": {
          "slidesPerView": 6,
          "spaceBetween": 0
        },
        "1300": {
          "slidesPerView": 8,
          "spaceBetween": 0
        },
        "1600": {
          "slidesPerView": 10,
          "spaceBetween": 0
        }
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