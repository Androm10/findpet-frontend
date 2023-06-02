import { FC, useEffect, useMemo, useRef, useState } from 'react';
import s from './pets.module.scss';
import { AnimalTypes } from 'core/entities/animal.entity';

import SearchOptions from 'components/animal/search-options';
import AnimalList from 'components/animal/animal-list';
import { useGetAnimalsQuery } from '@shared/store/api/animal.api';
import Spinner from '@ui/spinner';
import { useAppSelector } from '@shared/hooks/app-selector.hook';
import { useDebounce } from '@shared/hooks/use-debounce.hook';

const PetsPage: FC = () => {
  const [page, setPage] = useState(1);
  const { name, sex, type } = useAppSelector((state) => state.animalsFilterReducer);

  const [args, setArgs] = useState<any>({});
  const debouncedSetArgs = useDebounce(setArgs, 1000);

  const { data, isLoading, isFetching } = useGetAnimalsQuery(args);

  useEffect(() => {
    debouncedSetArgs({ page, filter: { name, sex, type } });
  }, [page, name, sex, type]);

  return (
    <div className={s['pet-page']}>
      <SearchOptions />
      <div className={s['pet-page__list']}>
        {isLoading || isFetching || !data ? <Spinner /> : <AnimalList animals={data.result} />}
      </div>
    </div>
  );
};
PetsPage.displayName = 'PetsPage';

export default PetsPage;
