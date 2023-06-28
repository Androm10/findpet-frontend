import { CHATBOT_URL } from '@shared/constants/api';
import io, { ManagerOptions, SocketOptions, Socket } from 'socket.io-client';

export class SocketEmitter {
  clientSocket: Socket | null = null;

  constructor(private connectionUrl: string, private options?: Partial<ManagerOptions & SocketOptions>) {
    // this.clientSocket = io(connectionUrl, options);
  }

  public connect() {
    this.clientSocket = io(this.connectionUrl, this.options);
  }

  public subscribe(event: string, callback: (...args: any) => void): this {
    if (this.clientSocket) {
      this.clientSocket.on(event, callback);
    }
    return this;
  }

  public emit(event: string, ...args: any): this {
    if (this.clientSocket) {
      this.clientSocket.emit(event, ...args);
    }
    return this;
  }

  public unsubscribe(event: string, callback: (...args: any) => void): this {
    if (this.clientSocket) {
      this.clientSocket.off(event, callback);
    }
    return this;
  }

  public closeConnection(): boolean {
    if (this.clientSocket) {
      this.clientSocket.close();
      return true;
    }
    return false;
  }

  public isConnected(): boolean {
    if (!this.clientSocket || !this.clientSocket.connected) return false;

    return true;
  }
}
