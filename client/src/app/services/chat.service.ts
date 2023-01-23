import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

export class ChatService {
  private socket = io('http://localhost:3000');

  /**
   * Notifies server that user is to join a room
   * @param data
   */
  joinRoom(data: any) {
    this.socket.emit('join', data);
  }

  /**
   * Gets the details of the user who joined the room from the server
   */
  userJoinedRoom() {
    let observable = new Observable<any>(observer => {
      this.socket.on('user-joined', data => {
        observer.next(data);
      });
      return () => this.socket.disconnect();
    });
    return observable;
  }

  /**
   * Notifies server that user is to leave a room
   * @param data
   */
  leaveRoom(data) {
    this.socket.emit('leave', data);
  }

  /**
   * Gets the details of the user who left the room from the server
   */
  userLeftRoom() {
    let observable = new Observable<any>(observer => {
      this.socket.on('user-left', data => {
        observer.next(data);
      });
      return () => this.socket.disconnect();
    });
    return observable;
  }

  /**
   * Notifies server about the message
   * @param data
   */
  sendMessage(data) {
    this.socket.emit('message', data);
  }

  /**
   * Gets the details of the message from the server
   */
  messageReceived() {
    let observable = new Observable<any>(observer => {
      this.socket.on('new-message', data => {
        observer.next(data);
      });
      return () => this.socket.disconnect();
    });
    return observable;
  }

  /**
     * Notifies server about private message
     * @param data
     */
  sendPrivateMessage(data) {
    this.socket.emit('send message', data);
  }

  /**
   * Gets the details of the message from the server
   */
  privateMessageReceived() {
    let observable = new Observable<any>(observer => {
      this.socket.on('private-message', data => {
        observer.next(data);
      });
      return () => this.socket.disconnect();
    });
    return observable;
  }
}
