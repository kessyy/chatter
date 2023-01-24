import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-room',
  templateUrl: './private-room.component.html',
  styleUrls: ['./private-room.component.scss']
})
export class PrivateRoomComponent implements OnInit {
  showEditUserForm: boolean;
  privateRoom: boolean = true;
  isRooms: boolean = false;
  isEditUser: boolean;
  isShowProfileComponent: boolean;
  showMembersComponent: boolean = true;
  isMembers: boolean = true;
  showAvatarsComponent: boolean;
  showAvatarsComponentCloseButton: boolean = true;
  showMembersComponentCloseButton: boolean = false;
  personalSpace: boolean = true;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  onEditUser(isEditUser: boolean) {
    this.isEditUser = isEditUser;
  }

  closeEditUserForm(isEditUser: boolean) {
    this.isEditUser = isEditUser;
  }

  showProfileArea(isShowProfileComponent: boolean) {
    this.isShowProfileComponent = isShowProfileComponent;
  }

  closeProfileArea(isShowProfileComponent: boolean) {
    this.isShowProfileComponent = isShowProfileComponent;
  }

  showRoomsArea(showAvatarsComponent: boolean) {
    this.showAvatarsComponent = showAvatarsComponent;
  }

  closeRoomsArea(showAvatarsComponent: boolean) {
    this.showAvatarsComponent = showAvatarsComponent;
  }

  showPersonalSpace(personalSpace: boolean) {
    this.personalSpace = personalSpace;
  }

}
