import { ClientEvents } from '@shared/constants/socket-events';
import { useAppDispatch } from '@shared/hooks/app-dispatch.hook';
import { useAppSelector } from '@shared/hooks/app-selector.hook';
import { useSocket } from '@shared/hooks/use-socket.hook';
import { chatActions } from '@shared/store/slices/chat.slice';
import { ChatEntity } from 'core/entities/chat.entity';
import { FC, useEffect, useState } from 'react';
import s from './chat-panel.module.scss';

const ChatPanel: FC = () => {
  const emitter = useSocket();
  const dispatch = useAppDispatch();
  const { chats } = useAppSelector((state) => state.chatReducer);

  const newChatHandler = (chat: ChatEntity) => {
    if (chats.find((c: any) => c.id == chat.id)) return;

    dispatch(chatActions.setChats([...chats, chat]));
  };

  useEffect(() => {
    if (!emitter) return;
    console.log('subscribed');
    emitter.subscribe(ClientEvents.NEW_CHAT, newChatHandler);

    return () => {
      emitter.unsubscribe(ClientEvents.NEW_CHAT, newChatHandler);
    };
  }, [emitter, newChatHandler, emitter?.clientSocket]);

  return (
    <div className={s['chat-panel']}>
      <h2>Your chats</h2>
      {chats.length ? chats.map((chat: ChatEntity) => <div key={chat.id}></div>) : <div>No available chats</div>}
    </div>
  );
};

ChatPanel.displayName = 'ChatPanel';

export default ChatPanel;
