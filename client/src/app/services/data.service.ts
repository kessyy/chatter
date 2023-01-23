import { Injectable, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  user: any;
  selectedUser = new BehaviorSubject<any>(null);
  changedSelectedUser = this.selectedUser.asObservable();

  setSelectedUser(user: User) {
    this.selectedUser.next(user);
  }

}
