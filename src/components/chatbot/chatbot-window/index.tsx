import Avatar from '@ui/avatar';
import { FC, useState } from 'react';
import ChatbotForm from '../chatbot-form';
import loginBackground from 'assets/images/login-background.jpg';
import ChatbotMessageList from '../chatbot-message-list';
import s from './chatbot-window.module.scss';
import { useChatbot } from '@shared/hooks/use-chatbot.hook';
import { useAppSelector } from '@shared/hooks/app-selector.hook';
import { CHATBOT_URL } from '@shared/constants/api';

const ChatbotWindow: FC = () => {
  const { user } = useAppSelector((state) => state.userReducer);

  const [input, setInput] = useState('');

  const { messages, sendMessage, isConnected } = useChatbot(`${CHATBOT_URL}?userId=${user.id}`);

  return (
    <div className={s['chatbot-window']}>
      <div className={s['chatbot-window__header']}>
        <Avatar url={loginBackground} />
        <label>Kesha the consultant</label>
      </div>
      <div className={s['chatbot-window__message-view']}>
        {isConnected ? (
          <ChatbotMessageList messages={messages} />
        ) : (
          <div>Constultant is not available right now...</div>
        )}
      </div>

      <div className={s['chatbot-window__form']}>
        <ChatbotForm setValue={setInput} value={input} sendHandler={() => sendMessage(input)} />
      </div>
    </div>
  );
};

ChatbotWindow.displayName = 'ChatbotWindow';

export default ChatbotWindow;
