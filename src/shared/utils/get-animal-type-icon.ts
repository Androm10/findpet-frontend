import { IconName } from '@fortawesome/fontawesome-svg-core';
import { animalTypeIcons, questionIcon } from '@shared/font-awesome-icons';
import { AnimalTypes } from 'core/entities/animal.entity';

export function getAnimalTypeIcon(type: keyof typeof AnimalTypes & IconName) {
  const keyName = `${type}Icon`;
  if (keyName in animalTypeIcons) {
    return animalTypeIcons[keyName as keyof typeof animalTypeIcons];
  } else {
    return questionIcon;
  }
}
