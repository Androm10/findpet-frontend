import { Coords } from 'core/types/coords.type';

export type ShelterEntity = {
  id: number;
  name: string;
  coords: Coords;
  description?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactUrl?: string;
  isVerified?: boolean;
};
