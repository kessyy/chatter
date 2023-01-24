import { Injectable, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  user: any;
  selectedUser = new BehaviorSubject<any>(null);
  changedSelectedUser = this.selectedUser.asObservable();
  @Output() isMenuClicked = new EventEmitter<boolean>();
  @Output() isPersonalRoom = new EventEmitter<boolean>();

  setSelectedUser(user: User) {
    this.selectedUser.next(user);
  }

  /**
   * Sends the event when the menu is clicked
   */
  menuClicked() {
    this.isMenuClicked.emit(true);
  }

   /**
   * Sends the event when the personal room is clicked
   */
   personalRoomClicked() {
    this.isPersonalRoom.emit(true);
  }


}
