import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Message } from '../models/message.model';

@Injectable({ providedIn: 'root' })
export class MessageService {
  headers = new HttpHeaders({ 'X-Requested-With': 'XMLHttpRequest' });

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Get all messages
   */
  getMessages() {
    return this.http.get(
      'messages/message-details',
      { headers: this.headers })
      .pipe(map(response => response));
  }

  /**
   * Search the messages
   *
   * @param search
   */
  searchMessage(search: Message) {
    return this.http.post(
      'search-message',
      search,
      { headers: this.headers })
      .pipe(map(response => response));
  }

  /**
   * send a message
   *
   * @param job
   */
  postMessage(message: Message) {
    return this.http.post(
      'messages/send-message',
      message,
      { headers: this.headers })
      .pipe(map(response => response));
  }

  /**
   * Updates the message in the db
   *
   * @param messageData to edit
   * @param id to message's id
   * @returns Observable<any>
   */
  editMessage(id: number, messageData: any) {
    return this.http.put(`message/${id}`, messageData);
  }

  /**
   * Deleted the message from the db
   *
   * @param id to edit
   * @returns Observable<any>
   */
  deleteMessage(id: number) {
    return this.http.delete(
      `message/${id}`,
      { headers: this.headers });
  }
}
