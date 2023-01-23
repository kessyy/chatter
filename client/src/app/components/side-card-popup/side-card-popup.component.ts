import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-side-card-popup',
  templateUrl: './side-card-popup.component.html',
  styleUrls: ['./side-card-popup.component.scss']
})
export class SideCardPopupComponent {
  @Input() showAvatarsComponent: boolean;
  @Input() isRooms: boolean;
  @Input() roomsPopUpClass: string;
  @Input() PopUpId: string;
  @Input() showAvatarsComponentCloseButton: boolean;
  @Output() RoomsButtonClicked = new EventEmitter<boolean>();
  user = [
    {
      id: 1,
      firstName: 'Jane',
      lastName: 'Doe',
      displayName: 'the_mighty_jane',
      status: 'Online',
      bio: 'A bunch of words written here. A bunch of words written here. A bunch of words written here.',
    }
  ];
  room: string;

  constructor(
    private chatService: ChatService
  ) { }

  show(id) {
    document.getElementById(id).style.display = 'block';
  }

  hide() {
    this.RoomsButtonClicked.emit(false);
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
    return false;
  }
}
