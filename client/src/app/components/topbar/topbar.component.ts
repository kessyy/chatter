import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
/*import { AuthenticationService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/auth.model';*/
import { ChatService } from '../../services/chat.service';
declare const $

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  // user: User;
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
  @Input() isPrivateRoom: boolean;
  @Input() isName: boolean;

  openMobileMenu: boolean;
  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  constructor(
    private router: Router,
    private dataService: DataService,
    /*private authenticationService: AuthenticationService,
    private utilsService: UtilsService*/
    private chatService: ChatService
  ) { }

  ngOnInit() {
    /*const { user } = this.authenticationService.currentUser();
    this.user = user;*/

    // $('li: has(ul)').click(function () {
    //   $(this).toggleClass('active');
    // });
  }

  // toggleSideBar() {
  //   this.dataService.menuClicked();
  // }

  // openRooms() {
  //   this.router.navigate(['/avatars']);
  // }

  openNav() {
    document.getElementById("mySidenav").style.width = "100%";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
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
    this.closeNav()
    this.router.navigate(['/private-room']);
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

  profile() { }

  /**
   * Logout the user
   */
  logout() {
    // this.authenticationService.logout();
    this.router.navigate(['/authenticate/login']);
  }
}
