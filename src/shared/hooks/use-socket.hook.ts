import { SOCKET_URL } from '@shared/constants/api';
import { JwtService } from '@shared/services/jwt.service';
import { SocketEmitter } from '@shared/services/socket.emitter';
import { useEffect, useState } from 'react';
import { useAppSelector } from './app-selector.hook';

export const useSocket = () => {
  const [emitter, setEmitter] = useState<SocketEmitter>();

  const { isAuth, user } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    if (isAuth) {
      const socketEmitter = new SocketEmitter(SOCKET_URL, {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: `Bearer ${JwtService.getAccessToken()}`,
            },
          },
        },
      });
      socketEmitter.connect();

      setEmitter(socketEmitter);
    }
  }, [isAuth]);

  return emitter;
};
