import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Room } from '../models/room.model';

@Injectable({ providedIn: 'root' })
export class RoomService {
  headers: HttpHeaders = new HttpHeaders({ 'X-Requested-With': 'XMLHttpRequest' });

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Get all rooms
   */
  getRooms() {
    return this.http.get(
      'rooms/all-rooms',
      { headers: this.headers })
      .pipe(map(response => response));
  }

  /**
   * Add user id to rooms
   */
  addUserToRoom(id: number, users: number) {
    console.log('clicked', { users });
    return this.http.put(`rooms/add-user/${id}`, { users }, { headers: this.headers }
    ).pipe(map(response => response));
  }
  // addUserToRoom(id: number, room_name: string) {
  //   console.log('clicked', `rooms/${id}`, room_name);
  //   return this.http.put(`rooms/${id}`, room_name,
  //     { headers: this.headers })
  //     .pipe(map(response => response));
  // }


  /**
   * Search the messages
   *
   * @param search
   */
  searchMessage(search: Room) {
    return this.http.post(
      'search-rooms',
      search,
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
    return this.http.put(`message / ${id}`, messageData);
  }

}
