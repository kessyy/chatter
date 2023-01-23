import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { UserProfileService } from '../../services/user.service';
import { DataService } from '../../services/data.service';
import { RoomService } from '../../services/rooms.service';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-side-card',
  templateUrl: './side-card.component.html',
  styleUrls: ['./side-card.component.scss']
})
export class SideCardComponent implements OnInit {
  @Input() showMembersComponentCloseButton: boolean;
  @Input() isPrivateRoom: boolean;
  @Input() showMembersComponent: boolean;
  @Input() subroomsPopUpClass: string;
  @Input() PopUpId: string;
  @Output() MembersButtonClicked = new EventEmitter<boolean>();
  // user = [
  //   {
  //     id: 1,
  //     firstName: 'Jane',
  //     lastName: 'Doe',
  //     displayName: 'the_mighty_jane',
  //     status: 'Online',
  //     bio: 'A bunch of words written here. A bunch of words written here. A bunch of words written here.',
  //   }
  // ];
  user: User[];
  users: User[];
  room: string;
  selectedUser: any;

  constructor(
    private chatService: ChatService,
    private userProfileService: UserProfileService,
    private dataService: DataService,
    private roomService: RoomService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userProfileService.getUsers().subscribe(response => {
      this.users = response as User[];
    });
  }

  show(id) {
    document.getElementById(id).style.display = 'block';
  }

  hide() {
    this.MembersButtonClicked.emit(false);
  }

  /**
  * Notifies all users when a new user joins a room
  */
  joinRoom(user: User) {
    this.chatService.joinRoom(
      {
        user: this.user,
        room: this.room
      });
    this.selectedUser = user;
    this.dataService.setSelectedUser(this.selectedUser);
    this.roomService.addUserToRoom(6, user.id);
    console.log('selected user', user.id)
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
