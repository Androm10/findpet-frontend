import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { searchIcon } from '@shared/font-awesome-icons';
import Button from '@ui/button';
import Input from '@ui/input';
import s from './search-options.module.scss';
import { AnimalTypes } from 'core/entities/animal.entity';
import { ChangeEvent, FC, useState } from 'react';

import { classNames } from '@shared/utils/class-names';
import AnimalTypeInput from 'components/inputs/animal-type-input';
import AnimalSexInput from 'components/inputs/animal-sex-input';

export interface SearchForm {
  sex?: 'M' | 'G';
  name?: string;
  type?: keyof typeof AnimalTypes;
}

const SearchOptions: FC = () => {
  const [isMoreOptions, setMoreOptions] = useState(false);

  const [searchForm, setSearchForm] = useState<SearchForm>({
    sex: 'M',
    type: 'cat',
  });

  const moreOptionsClickHandler = () => {
    setMoreOptions(!isMoreOptions);
  };

  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchForm({ ...searchForm, name: e.target.value });
  };

  const typeChangeHandler = (value: keyof typeof AnimalTypes) => {
    setSearchForm({ ...searchForm, type: value });
  };

  const sexChangeHandler = (value: 'M' | 'G') => {
    setSearchForm({ ...searchForm, sex: value });
  };

  return (
    <div className={s['search-options']}>
      <div className={s['search-options__basic-options']}>
        <Input placeholder="Name" onChange={nameChangeHandler} />

        <AnimalSexInput value={searchForm.sex as 'M' | 'G'} setValue={sexChangeHandler} />
        <AnimalTypeInput value={searchForm.type as keyof typeof AnimalTypes} setValue={typeChangeHandler} />
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
