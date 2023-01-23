import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chatData: any = [];
  user: string;
  room: string;
  message: string;
  @Input() maxHeight: string;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    // populate the chat whenever chat events occur
    let container = document.querySelector('.conversation-list');
    this.chatService.userJoinedRoom()
      .subscribe(data => {
        this.chatData.push(data)
        this.scrollChat(container);
      });

    this.chatService.userLeftRoom()
      .subscribe(data => {
        this.chatData.push(data)
        this.scrollChat(container);
      });

    this.chatService.messageReceived()
      .subscribe(data => {
        if (data.message) {
          this.chatData.push(data);
        }
        this.scrollChat(container);
        this.message = '';
      });
  }

  /**
   * Handles the chat scroll when a message is received
   * @param container
   */
  scrollChat(container: any) {
    setTimeout(() =>
      container.scrollTop = container.scrollHeight);
  }

  /**
   * Notifies all users when a new user joins a room
   */
  joinRoom() {
    this.chatService.joinRoom(
      {
        user: this.user,
        room: this.room
      });
  }

  /**
   * Notifies all users when a new user leaves a room
   */
  leaveRoom() {
    this.chatService.leaveRoom(
      {
        user: this.user,
        room: this.room
      });
  }

  /**
   * Sends a message to all users in the room
   */
  sendMessage() {
    this.chatService.sendMessage(
      {
        user: this.user,
        room: this.room,
        message: this.message
      });
  }
}
