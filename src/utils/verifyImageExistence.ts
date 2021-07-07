import { ORIGINAL_URL, POSTER_URL } from './urls';

export function verifyImageExistence(image: string | null, type: string) {
  if (image) {
    if (type.toLowerCase() === 'small') {
      image = `${POSTER_URL}${image}`;
    } else if (type.toLowerCase() === 'original') {
      image = `${ORIGINAL_URL}${image}`;
    }
  }

  return image;
}