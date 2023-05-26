import { FC, useState } from 'react';
import s from './animal-type-input.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { circleIcon } from '@shared/font-awesome-icons';
import { getAnimalTypeIcon } from '@shared/utils/get-animal-type-icon';
import FloatingMenu from '@ui/floating-menu';
import Menu from '@ui/menu';
import { AnimalTypes } from 'core/entities/animal.entity';

interface AnimalTypeInputProps {
  value: keyof typeof AnimalTypes | null;
  setValue: (value: keyof typeof AnimalTypes | null) => void;
}

const typesMenuItems = Object.keys(AnimalTypes).map((type) => ({
  name: type,
  value: type as string | null,
  icon: getAnimalTypeIcon(type as keyof typeof AnimalTypes),
}));

typesMenuItems.push({
  name: 'Any',
  value: null,
  icon: circleIcon,
});

const AnimalTypeInput: FC<AnimalTypeInputProps> = (props: AnimalTypeInputProps) => {
  const { value, setValue } = props;

  const [isTypesMenuHidden, setTypesMenuHidden] = useState(true);

  const typeChangeHandler = (value: keyof typeof AnimalTypes) => {
    setValue(value);
    setTypesMenuHidden(true);
  };

  return (
    <FloatingMenu
      element={<Menu value={value} onChange={typeChangeHandler} items={typesMenuItems} />}
      isHidden={isTypesMenuHidden}
      setHidden={setTypesMenuHidden}
      marginTop="40px"
    >
      <div className={s['animal-type-input__selection']} onClick={() => setTypesMenuHidden(false)}>
        <div>
          <FontAwesomeIcon icon={value ? getAnimalTypeIcon(value) : circleIcon} />
        </div>
        <div>
          <span>{value || 'Any'}</span>
        </div>
      </div>
    </FloatingMenu>
  );
};

AnimalTypeInput.displayName = 'AnimalTypeInput';
export default AnimalTypeInput;
