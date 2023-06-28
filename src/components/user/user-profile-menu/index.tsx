import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cameraIcon, editIcon } from '@shared/font-awesome-icons';
import { useUpdateAvatarMutation, useUpdateUserMutation } from '@shared/store/api/user.api';
import Button from '@ui/button';
import Input from '@ui/input';
import Modal from '@ui/modal';
import AvatarInput from 'components/inputs/avatar-input';
import { FC, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import s from './user-profile-menu.module.scss';

const UserProfileMenu: FC = () => {
  const [
    updateAvatar,
    { data: updateAvatarData, isLoading: isAvatarLoading, isSuccess: isAvatarSuccess, isError: isAvatarError },
  ] = useUpdateAvatarMutation();
  const [
    updateUser,
    { data: updateUserData, isLoading: isUserLoading, isSuccess: isUserSuccess, isError: isUserError },
  ] = useUpdateUserMutation();

  const [isChangeUsernameModal, setChangeUsernameModal] = useState(true);
  const [isChangeAvatarModal, setChangeAvatarModal] = useState(true);

  const [avatar, setAvatar] = useState();
  const [username, setUsername] = useState('');

  const updateAvatarHandler = () => {
    if (!avatar) return;
    const formData = new FormData();
    formData.append('avatar', avatar);

    updateAvatar({ formData });
  };

  const updateUsernameHandler = () => {
    if (!username) return;

    updateUser({ username });
  };

  useEffect(() => {
    if (isAvatarSuccess) {
      toast.done('Avatar successfully changed!');
    }

    if (isAvatarError) {
      toast.error('Avatar change error');
    }
  }, [isAvatarLoading]);

  useEffect(() => {
    if (isUserSuccess) {
      toast.done('Username successfully changed!');
    }

    if (isUserError) {
      toast.error('Username change error');
    }
  }, [isUserLoading]);

  return (
    <>
      <div className={s['user-profile-menu']}>
        <div className={s['user-profile-menu__item']} onClick={() => setChangeAvatarModal(false)}>
          <FontAwesomeIcon icon={cameraIcon} />
          <span>Change avatar</span>
        </div>
        <div className={s['user-profile-menu__item']} onClick={() => setChangeUsernameModal(false)}>
          <FontAwesomeIcon icon={editIcon} />
          <span>Change username</span>
        </div>
      </div>
      <Modal isHidden={isChangeUsernameModal} setHidden={setChangeUsernameModal}>
        <div>
          <h1>Change username</h1>
          <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          <Button onClick={updateUsernameHandler} as="button" style={{ marginTop: '20px' }} size="medium">
            Change
          </Button>
        </div>
      </Modal>
      <Modal isHidden={isChangeAvatarModal} setHidden={setChangeAvatarModal}>
        <div>
          <h1>Change avatar</h1>
          <AvatarInput value={avatar} setValue={setAvatar} />
          <Button onClick={updateAvatarHandler} as="button" style={{ marginTop: '20px' }} size="medium">
            Change
          </Button>
        </div>
      </Modal>
    </>
  );
};

UserProfileMenu.displayName = 'UserProfileMenu';

export default UserProfileMenu;
