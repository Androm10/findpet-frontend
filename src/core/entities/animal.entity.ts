import { Photo } from 'core/types/photo.type';

export type AnimalEntity = {
  id: number;
  name: string;
  age: number;
  sex: 'M' | 'G';
  type: keyof typeof AnimalTypes;
  photos: Photo[];
  description?: string;
  shelterId?: number;
};

export enum AnimalTypes {
  cat = 'cat',
  dog = 'dog',
  bird = 'bird',
  mouse = 'mouse',
  turtle = 'turtle',
}
