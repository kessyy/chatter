import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { UserProfileService } from '../../services/user.service';
import { DataService } from '../../services/data.service';
import { RoomService } from '../../services/rooms.service';
import { User } from '../../models/user.model';
import { Room } from '../../models/room.model';
import { first } from 'rxjs/operators';

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
  @Output() openPersonalSpace = new EventEmitter<boolean>();
  user: User[];
  currentUser: User;
  users: User[];
  rooms: Room[];
  room: string;
  selectedUser: any;

  constructor(
    private chatService: ChatService,
    private userProfileService: UserProfileService,
    private dataService: DataService,
    private roomService: RoomService
  ) { }

  ngOnInit(): void {
    // TODO: get logged in User
    this.userProfileService.getSingleUser(2).subscribe(response => {
      this.currentUser = response as User;
    });

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
  * Notifies all users when a new user joins a room and closes personal space
  */
  joinRoom(user: User) {
    this.openPersonalSpace.emit(false);
    this.chatService.joinRoom(
      {
        user: this.user,
        room: this.room
      });
    this.selectedUser = user;
    this.dataService.setSelectedUser(this.selectedUser);
    const users = user.id;
    this.roomService.addUserToRoom(12, users).pipe(first()).subscribe(response => {
      console.log('endpoint response', response)
    }, error => {
      console.log('endpoint error', error)
    });
    // this.roomService.getRooms().subscribe(response => {
    //   this.rooms = response['rooms'];
    //   console.log('rooms', this.rooms);
    // });
  }


  /**
  * Enter personal space
  */
  personalSpace() {
    this.openPersonalSpace.emit(true);
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
