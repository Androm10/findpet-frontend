import { YANDEX_API_KEY } from '@shared/constants/api';
import { Coords } from 'core/types/coords.type';

export async function addressByCoords(coords: Coords) {
  const res = await fetch(
    `https://geocode-maps.yandex.ru/1.x/?apikey=${YANDEX_API_KEY}&format=json&geocode=${coords.latitude},${coords.longitude}&lang=en_US`,
  );

  const body = await res.json();
  const address = body.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text;

  return address;
}
