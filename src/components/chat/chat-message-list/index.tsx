import { MessageEntity } from 'core/entities/message.entity';
import { ChatbotMessage } from 'core/types/chatbot-message.type';
import { FC } from 'react';
import ChatMessage from '../chat-message';
import s from './chatbot-message-list.module.scss';

interface ChatMessageListProps {
  messages: MessageEntity[];
}

const ChatMessageList: FC<ChatMessageListProps> = (props: ChatMessageListProps) => {
  const { messages } = props;

  return (
    <div className={s['chat-message-list']}>
      {messages.map((m, index) => (
        <div key={m.text + index} className={s['chat-message-list__item']}>
          <ChatMessage message={m} />
        </div>
      ))}
    </div>
  );
};

export default ChatMessageList;

ChatMessageList.displayName = 'ChatMessageList';
