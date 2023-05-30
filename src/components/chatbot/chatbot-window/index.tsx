import Avatar from '@ui/avatar';
import { FC } from 'react';
import ChatbotForm from '../chatbot-form';
import loginBackground from 'assets/images/login-background.jpg';
import ChatbotMessageList from '../chatbot-message-list';
import s from './chatbot-window.module.scss';

const ChatbotWindow: FC = () => {
  return (
    <div className={s['chatbot-window']}>
      <div className={s['chatbot-window__header']}>
        <Avatar url={loginBackground} />
        <label>Kesha the consultant</label>
      </div>
      <div className={s['chatbot-window__message-view']}>
        <ChatbotMessageList />
      </div>
      <div className={s['chatbot-window__form']}>
        <ChatbotForm />
      </div>
    </div>
  );
};

ChatbotWindow.displayName = 'ChatbotWindow';

export default ChatbotWindow;
