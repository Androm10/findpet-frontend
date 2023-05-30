import { useAppSelector } from '@shared/hooks/app-selector.hook';
import { useAddWorkerMutation } from '@shared/store/api/shelter.api';
import Button from '@ui/button';
import Input from '@ui/input';
import Spinner from '@ui/spinner';
import { FC, useEffect, useState } from 'react';
import s from './add-worker-form.module.scss';

interface AddWorkerFormProps {
  onSuccess?: (email?: string) => void;
}

const AddWorkerForm: FC<AddWorkerFormProps> = (props: AddWorkerFormProps) => {
  const { onSuccess } = props;

  const [addWorker, { data, isSuccess, isError, error, isLoading }] = useAddWorkerMutation();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useAppSelector((state) => state.userReducer);

  const addWorkerHandler = () => {
    if (user && user.shelterId && email) {
      addWorker({ email, id: user.shelterId });
    }
  };

  useEffect(() => {
    if (isError && !isSuccess) {
      if (error && 'data' in error) {
        const response: any = error.data;
        setErrorMessage(response.message);
      }
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess && onSuccess) {
      onSuccess(email);
    }
  }, [isSuccess]);

  return (
    <div className={s['add-worker-form']}>
      <h2 className={s['add-worker-form__header']}>Add worker</h2>
      <p className={s['add-worker-form__text']}>Enter login (email) of user</p>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      {isError && <div className={s['add-worker-form__error-message']}>{errorMessage}</div>}
      <Button disabled={isLoading} className={s['add-worker-form__button']} as="button" onClick={addWorkerHandler}>
        {isLoading ? <Spinner size="small" /> : 'Add'}
      </Button>
    </div>
  );
};

AddWorkerForm.displayName = 'AddWorkerForm';

export default AddWorkerForm;
