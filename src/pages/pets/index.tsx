import { FC, useEffect, useMemo, useRef, useState } from 'react';
import s from './pets.module.scss';
import { AnimalTypes } from 'core/entities/animal.entity';

import SearchOptions from 'components/animal/search-options';
import AnimalList from 'components/animal/animal-list';
import { useGetAnimalsQuery } from '@shared/store/api/animal.api';
import Spinner from '@ui/spinner';
import { useAppSelector } from '@shared/hooks/app-selector.hook';

const PetsPage: FC = () => {
  const [page, setPage] = useState(1);
  const { name, sex, type } = useAppSelector((state) => state.animalsFilterReducer);

  const [args, setArgs] = useState<any>({});
  const timeoutRef = useRef<number>();

  const { data, isLoading, isFetching } = useGetAnimalsQuery(args);

  useEffect(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => setArgs({ page, filter: { name, sex, type } }), 500);
  }, [page, name, sex, type]);

  return (
    <div className={s['pet-page']}>
      <SearchOptions />
      <h1>Find a pet for yourself!</h1>
      {isLoading || isFetching || !data ? <Spinner /> : <AnimalList animals={data.result} />}
    </div>
  );
};
PetsPage.displayName = 'PetsPage';

export default PetsPage;
