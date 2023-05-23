import { Coords } from 'core/types/coords.type';
import { Photo } from 'core/types/photo.type';

export type ShelterEntity = {
  id: number;
  name: string;
  coords: Coords;
  photos: Photo[];
  description?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactUrl?: string;
  isVerified?: boolean;
};
