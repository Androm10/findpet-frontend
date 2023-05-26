import { YANDEX_API_KEY } from '@shared/constants/api';
import { Coords } from 'core/types/coords.type';

export async function coordsByAddress(address: string) {
  const res = await fetch(
    `https://geocode-maps.yandex.ru/1.x/?apikey=${YANDEX_API_KEY}&format=json&geocode=${address.replaceAll(
      ' ',
      '+',
    )}&lang=en_US`,
  );

  const body = await res.json();
  const position = body.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
  const coords = {
    longitude: position[1],
    latitude: position[0],
  };

  return coords;
}
