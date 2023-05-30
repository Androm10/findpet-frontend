import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sendIcon } from '@shared/font-awesome-icons';
import Button from '@ui/button';
import Input from '@ui/input';
import { FC } from 'react';
import s from './chatbot-form.module.scss';

const ChatbotForm: FC = () => {
  return (
    <div className={s['chatbot-form']}>
      <Input fullWidth />
      <Button as="button" round>
        <FontAwesomeIcon icon={sendIcon} />
      </Button>
    </div>
  );
};

ChatbotForm.displayName = 'ChatbotForm';

export default ChatbotForm;
