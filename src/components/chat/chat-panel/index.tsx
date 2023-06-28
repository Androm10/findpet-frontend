import { ClientEvents } from '@shared/constants/socket-events';
import { useAppDispatch } from '@shared/hooks/app-dispatch.hook';
import { useAppSelector } from '@shared/hooks/app-selector.hook';
import { useSocket } from '@shared/hooks/use-socket.hook';
import { SocketEmitter } from '@shared/services/socket.emitter';
import { chatActions } from '@shared/store/slices/chat.slice';
import { ChatEntity } from 'core/entities/chat.entity';
import { FC, useEffect, useState } from 'react';

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

    emitter.subscribe(ClientEvents.NEW_CHAT, newChatHandler);

    return () => {
      emitter.unsubscribe(ClientEvents.NEW_CHAT, newChatHandler);
    };
  }, [emitter, newChatHandler, emitter?.clientSocket]);

  return <></>;
};

ChatPanel.displayName = 'ChatPanel';

export default ChatPanel;
