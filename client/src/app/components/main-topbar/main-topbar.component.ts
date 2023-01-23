import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
// import { emit } from 'process';
import { DataService } from '../../services/data.service';
/*import { AuthenticationService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/auth.model';*/
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-topbar',
  templateUrl: './main-topbar.component.html',
  styleUrls: ['./main-topbar.component.scss']
})
export class MainTopbarComponent implements OnInit {
  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();
  @Output() profileButtonClicked = new EventEmitter<boolean>();
  // user: User;
  showProfileComponent: boolean;
  openMobileMenu: boolean;
  searchForm: FormGroup;

  constructor(
    private router: Router,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    /*private authenticationService: AuthenticationService,
    private utilsService: UtilsService*/
  ) { }

  ngOnInit() {
    /*const { user } = this.authenticationService.currentUser();
    this.user = user;*/
    this.searchForm = this.formBuilder.group({
      searchWord: [''],
    });
  }

  get f() {
    return this.searchForm.controls;
  }

  onSearch() { }

  showProfile() {
    this.profileButtonClicked.emit(true);
  }

  closeProfile() {
    this.profileButtonClicked.emit(false);
  }

  /**
   * Logout the user
   */
  logout() {
    // this.authenticationService.logout();
    this.router.navigate(['/authenticate/login']);
  }
}
