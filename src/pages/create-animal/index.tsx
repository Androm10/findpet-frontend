import AnimalForm from 'components/animal/animal-form';
import { FC } from 'react';

const CreateAnimalPage: FC = () => {
  return (
    <>
      <AnimalForm />
    </>
  );
};

CreateAnimalPage.displayName = 'CreateAnimalPage';
export default CreateAnimalPage;
