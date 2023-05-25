import { FC, useState } from 'react';
import s from './animal-sex-input.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { marsIcon, venusIcon } from '@shared/font-awesome-icons';
import FloatingMenu from '@ui/floating-menu';
import Menu from '@ui/menu';

interface AnimalSexInputProps {
  value: 'M' | 'G';
  setValue: (value: 'M' | 'G') => void;
}

const sexMenuItems = [
  { name: 'Boy', value: 'M', icon: marsIcon },
  { name: 'Girl', value: 'G', icon: venusIcon },
];

const AnimalSexInput: FC<AnimalSexInputProps> = (props: AnimalSexInputProps) => {
  const { value, setValue } = props;

  const [isSexMenuHidden, setSexMenuHidden] = useState(true);

  const sexChangeHandler = (value: 'M' | 'G') => {
    setValue(value);
    setSexMenuHidden(true);
  };

  return (
    <FloatingMenu
      marginTop="40px"
      element={<Menu value={value} onChange={sexChangeHandler} items={sexMenuItems} />}
      isHidden={isSexMenuHidden}
      setHidden={setSexMenuHidden}
    >
      <div className={s['animal-sex-input__selection']} onClick={() => setSexMenuHidden(false)}>
        <div>
          <FontAwesomeIcon icon={value === 'M' ? marsIcon : venusIcon} />
        </div>
        <div>
          <span>{value === 'M' ? 'Boy' : 'Girl'}</span>
        </div>
      </div>
    </FloatingMenu>
  );
};

AnimalSexInput.displayName = 'AnimalSexInput';
export default AnimalSexInput;
