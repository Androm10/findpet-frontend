import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sendIcon } from '@shared/font-awesome-icons';
import Button from '@ui/button';
import Input from '@ui/input';
import { FC, KeyboardEvent } from 'react';
import s from './chatbot-form.module.scss';

interface ChatbotFormProps {
  value: string;
  setValue: (v: string) => void;
  sendHandler: () => void;
}

const ChatbotForm: FC<ChatbotFormProps> = (props: ChatbotFormProps) => {
  const { value, setValue, sendHandler } = props;

  const clickHandler = () => {
    if (value) {
      sendHandler();
      setValue('');
    }
  };

  const keyDownEvent = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Enter':
        clickHandler();
        return;
      default:
        return;
    }
  };

  return (
    <div className={s['chatbot-form']}>
      <Input fullWidth value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={keyDownEvent} />
      <Button as="button" round onClick={clickHandler}>
        <FontAwesomeIcon icon={sendIcon} />
      </Button>
    </div>
  );
};

ChatbotForm.displayName = 'ChatbotForm';

export default ChatbotForm;
