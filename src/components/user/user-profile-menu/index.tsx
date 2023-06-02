import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cameraIcon, editIcon } from '@shared/font-awesome-icons';
import Button from '@ui/button';
import Input from '@ui/input';
import Modal from '@ui/modal';
import AvatarInput from 'components/inputs/avatar-input';
import { FC, useState } from 'react';
import s from './user-profile-menu.module.scss';

const UserProfileMenu: FC = () => {
  const [isChangeUsernameModal, setChangeUsernameModal] = useState(true);
  const [isChangeAvatarModal, setChangeAvatarModal] = useState(true);

  const [avatar, setAvatar] = useState();
  const [username, setUsername] = useState('');

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
          <Button as="button">Change</Button>
        </div>
      </Modal>
      <Modal isHidden={isChangeAvatarModal} setHidden={setChangeAvatarModal}>
        <div>
          <h1>Change avatar</h1>
          <AvatarInput value={avatar} setValue={setAvatar} />
          <Button as="button">Change</Button>
        </div>
      </Modal>
    </>
  );
};

UserProfileMenu.displayName = 'UserProfileMenu';

export default UserProfileMenu;
