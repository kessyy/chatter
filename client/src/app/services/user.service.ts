import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  headers: HttpHeaders = new HttpHeaders({ 'X-Requested-With': 'XMLHttpRequest' });
  constructor(private http: HttpClient) { }

  /**
  * Gets All Users
  */
  getUsers() {
    return this.http.get(
      'users/details',
      { headers: this.headers })
      .pipe(map(response => response));
  }

  /**
    * Gets single Users
    */
  getSingleUser(id: number) {
    return this.http.get(
      `users/${id}`,
      { headers: this.headers })
      .pipe(map(response => response));
  }

  /**
   * Updates the user in the db
   *
   * @param formData to edit
   * @param id to user's id
   * @returns Observable<any>
   */
  editUser(formData: any, id: number) {
    return this.http.put(`user / ${id}`, formData);
  }

  /**
   * Edits the user in the db
   *
   * @param data for the password to change
   * @returns Observable<any>
   */
  changePassword(data: any): Observable<any> {
    return this.http.put('change-password', data);
  }


  /**
   * Sends email to server to check
   *
   * @param emailData for the email
   * @returns Observable<any>
   */
  forgotPassword(emailData: any): Observable<any> {
    return this.http.post('password/email', emailData);
  }

  /**
   * Resets the password
   *
   * @param data for the email
   * @returns Observable<any>
   */
  resetPassword(data: any): Observable<any> {
    return this.http.post('password/reset', data);
  }

  /**
   * Uploads profile documents
   * @param formData
   * @param id
   * @return server response
   */
  uploadDocuments(formData: any, id: number) {
    const imageHeaders = new HttpHeaders();
    imageHeaders.append('Content-Type', 'multipart/form-data');
    imageHeaders.append('Accept', 'application/json');
    return this.http.post(
      `profile - documents / ${id}`,
      formData,
      { headers: imageHeaders })
      .pipe(map(response => response));
  }

  /**
   * Updates profile documents
   * @param formData
   * @param id
   * @return server response
   */
  updateDocuments(formData: any, id: number) {
    const imageHeaders = new HttpHeaders();
    imageHeaders.append('Content-Type', 'multipart/form-data');
    imageHeaders.append('Accept', 'application/json');
    return this.http.post(
      `profile - documents - update / ${id}`,
      formData,
      { headers: imageHeaders })
      .pipe(map(response => response));
  }

  /**
     * Deletes the user from the db
     *
     * @param id to edit
     * @returns Observable<any>
     */
  deleteUser(id: number) {
    return this.http.delete(
      `user / ${id}`,
      { headers: this.headers });
  }
}
