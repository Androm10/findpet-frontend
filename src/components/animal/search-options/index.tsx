import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { circleIcon, marsIcon, searchIcon, venusIcon } from '@shared/font-awesome-icons';
import Button from '@ui/button';
import Input from '@ui/input';
import s from './search-options.module.scss';
import { AnimalTypes } from 'core/entities/animal.entity';
import { ChangeEvent, FC, useState } from 'react';
import FloatingMenu from '@ui/floating-menu';
import { getAnimalTypeIcon } from '@shared/utils/get-animal-type-icon';
import Menu from '@ui/menu';

export interface SearchForm {
  sex?: 'M' | 'G';
  name?: string;
  type?: keyof typeof AnimalTypes;
}

const typesMenuItems = Object.keys(AnimalTypes).map((type) => ({
  name: type,
  value: type,
  icon: getAnimalTypeIcon(type as keyof typeof AnimalTypes),
}));

const sexMenuItems = [
  { name: 'Boy', value: 'M', icon: marsIcon },
  { name: 'Girl', value: 'G', icon: venusIcon },
];

const SearchOptions: FC = () => {
  const [isSexMenuHidden, setSexMenuHidden] = useState(true);
  const [isTypesMenuHidden, setTypesMenuHidden] = useState(true);
  const [searchForm, setSearchForm] = useState<SearchForm>({
    sex: 'M',
    type: 'cat',
  });

  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchForm({ ...searchForm, name: e.target.value });
  };

  const typeChangeHandler = (value: keyof typeof AnimalTypes) => {
    setSearchForm({ ...searchForm, type: value });
    setTypesMenuHidden(true);
  };

  const sexChangeHandler = (value: 'M' | 'G') => {
    setSearchForm({ ...searchForm, sex: value });
    setSexMenuHidden(true);
  };

  return (
    <div className={s['search-options']}>
      <Input placeholder="Name" onChange={nameChangeHandler} />

      <FloatingMenu
        marginTop="40px"
        element={<Menu value={searchForm.sex} onChange={sexChangeHandler} items={sexMenuItems} />}
        isHidden={isSexMenuHidden}
        setHidden={setSexMenuHidden}
      >
        <div className={s['search-options__selection']} onClick={() => setSexMenuHidden(false)}>
          <div>
            <FontAwesomeIcon icon={searchForm.sex === 'M' ? marsIcon : venusIcon} />
          </div>
          <div>
            <span>{searchForm.sex === 'M' ? 'Boy' : 'Girl'}</span>
          </div>
        </div>
      </FloatingMenu>
      <FloatingMenu
        element={<Menu value={searchForm.type} onChange={typeChangeHandler} items={typesMenuItems} />}
        isHidden={isTypesMenuHidden}
        setHidden={setTypesMenuHidden}
        marginTop="40px"
      >
        <div className={s['search-options__selection']} onClick={() => setTypesMenuHidden(false)}>
          <div>
            <FontAwesomeIcon icon={searchForm.type ? getAnimalTypeIcon(searchForm.type) : circleIcon} />
          </div>
          <div>
            <span>{searchForm.type}</span>
          </div>
        </div>
      </FloatingMenu>
      <div className={s['search-options__buttons']}>
        <Button as="a" round size="medium">
          <FontAwesomeIcon icon={searchIcon} />
        </Button>
      </div>
    </div>
  );
};

SearchOptions.displayName = 'SearchOptions';

export default SearchOptions;
