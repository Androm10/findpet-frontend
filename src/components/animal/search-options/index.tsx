import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { searchIcon } from '@shared/font-awesome-icons';
import Button from '@ui/button';
import Input from '@ui/input';
import s from './search-options.module.scss';
import { AnimalTypes } from 'core/entities/animal.entity';
import { ChangeEvent, FC, useEffect, useState } from 'react';

import { classNames } from '@shared/utils/class-names';
import AnimalTypeInput from 'components/inputs/animal-type-input';
import AnimalSexInput from 'components/inputs/animal-sex-input';
import { useAppDispatch } from '@shared/hooks/app-dispatch.hook';
import { animalsFilterActions } from '@shared/store/slices/animals-filter.slice';
import { useAppSelector } from '@shared/hooks/app-selector.hook';

export interface SearchForm {
  sex?: 'M' | 'G';
  name?: string;
  type?: keyof typeof AnimalTypes;
}

const SearchOptions: FC = () => {
  const [isMoreOptions, setMoreOptions] = useState(false);
  const dispatch = useAppDispatch();
  const { setName, setSex, setType } = animalsFilterActions;
  const { name, sex, type } = useAppSelector((state) => state.animalsFilterReducer);

  const moreOptionsClickHandler = () => {
    setMoreOptions(!isMoreOptions);
  };

  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // setSearchForm({ ...searchForm, name: e.target.value });
    dispatch(setName(e.target.value));
  };

  const typeChangeHandler = (value: keyof typeof AnimalTypes | null) => {
    // setSearchForm({ ...searchForm, type: value });
    dispatch(setType(value));
  };

  const sexChangeHandler = (value: 'M' | 'G' | null) => {
    // setSearchForm({ ...searchForm, sex: value });
    dispatch(setSex(value));
  };

  return (
    <div className={s['search-options']}>
      <div className={s['search-options__basic-options']}>
        <Input placeholder="Name" value={name} onChange={nameChangeHandler} />

        <AnimalSexInput value={sex} setValue={sexChangeHandler} />
        <AnimalTypeInput value={type} setValue={typeChangeHandler} />
        <div className={s['search-options__buttons']}>
          <Button as="a" round size="medium">
            <FontAwesomeIcon icon={searchIcon} />
          </Button>
        </div>
      </div>
      <div
        className={[
          s['search-options__more-options'],
          classNames({
            [s['search-options__more-options_active']]: isMoreOptions,
          }),
        ].join(' ')}
      >
        No more options
      </div>
      <div
        className={[
          s['search-options__more-button'],
          classNames({
            [s['search-options__more-button_active']]: isMoreOptions,
          }),
        ].join(' ')}
        onClick={moreOptionsClickHandler}
      />
    </div>
  );
};

SearchOptions.displayName = 'SearchOptions';

export default SearchOptions;
