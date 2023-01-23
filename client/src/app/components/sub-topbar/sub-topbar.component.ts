import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';

declare const $;

@Component({
  selector: 'app-sub-topbar',
  templateUrl: './sub-topbar.component.html',
  styleUrls: ['./sub-topbar.component.scss']
})
export class SubTopbarComponent implements OnInit {
  @Input() showMembersComponent: boolean;
  @Input() isMembers: boolean;
  @Output() mobileMenuButtonClicked = new EventEmitter();
  @Output() RoomsButtonClicked = new EventEmitter<boolean>();
  @Output() MembersButtonClicked = new EventEmitter<boolean>();
  headerText: boolean = true;
  useName: boolean = true;
  openMobileMenu: boolean;
  searchForm: FormGroup;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    /*const { user } = this.authenticationService.currentUser();
    this.user = user;*/
    this.dataService.changedSelectedUser.subscribe(user => {
      this.user = user;
      console.log('imported selected user', this.user)

    });
    this.searchForm = this.formBuilder.group({
      searchWord: [''],
    });
  }

  get f() {
    return this.searchForm.controls;
  }

  showMembers() {
    // this.MembersButtonClicked.emit(true);
    this.RoomsButtonClicked.emit(true);
  }

  showRooms() {
    this.RoomsButtonClicked.emit(true);
  }

  onSearch() { }
}
