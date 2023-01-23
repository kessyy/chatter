import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from './cookie.service';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  userData: any;
  headers = new HttpHeaders({
    'X-Requested-With': 'XMLHttpRequest'
  });
  // isLoginSubject = new BehaviorSubject<any>(this.isValidUser());
  // isLocalSubject = new BehaviorSubject<any>(this.isLocal());
  // isAdminSubject = new BehaviorSubject<any>(this.isAdmin());

  constructor(
    private http: HttpClient,
    private router: Router,
    // private jwtHelper: JwtHelperService,
    private cookieService: CookieService
  ) { }

  /**
   * Returns the current user
   */
  currentUser() {
    return this.userData;
  }

  // /**
  //  * Checks the status of the token
  //  * @return boolean
  //  */
  // isTokenExpired(): boolean {
  //   if (this.userData) {
  //     return this.jwtHelper.isTokenExpired(this.userData['access_token']);
  //   }
  // }

  // /**
  //  * User is loggedIn and token is valid
  //  * @return boolean
  //  */
  // isValidUser() {
  //   // this.userData = JSON.parse(this.cookieService.getCookie('currentUser'));
  //   this.userData = JSON.parse(sessionStorage.getItem('currentUser'));
  //   return !!this.userData && !this.isTokenExpired();
  // }

  // /**
  //  * Checks if user is logged in
  //  * @returns {Observable<boolean>}
  //  */
  // isLoggedIn(): Observable<boolean> {
  //   return this.isLoginSubject.asObservable();
  // }

  /**
   * Checks if user is candidate
   * @return {boolean}
   */
  isLocal(): boolean {
    if (this.currentUser()) {
      const { user } = this.currentUser();
      return user.account_type === Role.Local;
    }
  }

  /**
   * Checks if user is admin
   * @return {boolean}
   */
  isAdmin(): boolean {
    if (this.currentUser()) {
      const { user } = this.currentUser();
      return user.account_type === Role.Admin;
    }
  }

  // /**
  //  * Checks if local user is logged in
  //  * @returns {Observable<boolean>}
  //  */
  // isLocalLoggedIn(): Observable<boolean> {
  //   return this.isLocalSubject.asObservable();
  // }

  // /**
  //  * Checks if admin is logged in
  //  * @returns {Observable<boolean>}
  //  */
  // isAdminLoggedIn(): Observable<boolean> {
  //   return this.isAdminSubject.asObservable();
  // }

  /**
   * Register user
   * @return server response
   */
  register(userData: User) {
    return this.http.post(
      'users/register',
      userData,
      { headers: this.headers })
      .pipe(map(response => response));
  }

  /**
   * Sends Verification email to the registered user
   * @param id for
   * @return server response
   */
  sendVerification(id: number) {
    return this.http.post(
      'email/resend',
      { id },
      { headers: this.headers })
      .pipe(map(response => response));
  }

  /**
   * Sends Verification credentials to server
   * @param queryURL to the server
   * @return object response from the server
   */
  verifyEmail(queryURL: string) {
    return this.http.get(
      queryURL,
      { headers: this.headers })
      .pipe(map(response => response));
  }

  /**
   * Performs the auth
   * @param email email of user
   * @param password password of user
   */
  login(email: User, password: User) {
    return this.http.post<any>(
      'users/login',
      { email, password },
      { headers: this.headers })
      .pipe(map(user => {
        if (user && user.token) {
          this.userData = user;
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  }


  /**
   * Logout the user
   */
  logout() {
    // this.cookieService.deleteCookie('currentUser');
    // sessionStorage.removeItem('currentUser');
    // this.userData = null;
    // this.isLoginSubject.next(false);
    // this.isLocalSubject.next(false);
    // this.isAdminSubject.next(false);
    this.router.navigateByUrl('authenticate/login');
  }
}

