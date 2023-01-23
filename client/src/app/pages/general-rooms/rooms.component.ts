import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  privateRoom: boolean = false;
  isRooms: boolean = true;
  isEditUser: boolean;
  isShowProfileComponent: boolean;
  showAvatarsComponent: boolean;
  showAvatarsComponentCloseButton: boolean = true;
  showMembersComponentCloseButton: boolean = false;
  isMembers: boolean = false;
  showMembersComponent: boolean = true;

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

  onSearch() {
  }

}
