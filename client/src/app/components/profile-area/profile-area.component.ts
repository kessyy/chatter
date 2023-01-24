import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { UserProfileService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile-area',
  templateUrl: './profile-area.component.html',
  styleUrls: ['./profile-area.component.scss']
})
export class ProfileAreaComponent implements OnInit {
  @Input() componentClassString: string;
  // @Input() isPrivateRoom: boolean;
  // @Input() isName: boolean;
  @Input() isShowProfileComponent: boolean;
  @Output() profileButtonClicked = new EventEmitter<boolean>();
  @Output() openEditForm = new EventEmitter<boolean>();
  submitted: boolean;
  EditUserForm: FormGroup;
  user: User;
  room: string;
  showEditUserForm: boolean;
  @ViewChild('userForm', { static: false })
  userForm: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private userProfileService: UserProfileService,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    // TODO: change this to logged in user
    this.userProfileService.getSingleUser(2).subscribe(
      response => {
        this.user = response as User;
      });

    this.EditUserForm = this.formBuilder.group({
      firstName: [this.user.first_name, [Validators.required, Validators.minLength(2)]],
      lastName: [this.user.last_name, [Validators.required, Validators.minLength(2)]],
      displayName: [this.user.alias_name, [Validators.required, Validators.minLength(2)]],
      status: [this.user.is_active, [Validators.required]],
      telephone: [this.user.telephone, [Validators.required]],
      bio: [this.user.bio, [Validators.required, Validators.minLength(50)]],
    });
  }

  get f() {
    return this.EditUserForm.controls;
  }

  openEditUser() {
    this.openEditForm.emit(true);
    this.profileButtonClicked.emit(false);
    // const htmlData = document.querySelector('#form');
    setTimeout(() => console.log('form', this.userForm), 6000)
    // console.log('form', this.userForm)
    //   Swal.fire({
    //     title: 'Edit Profile',
    //     // template: '#userForm',
    //     // html: this.userForm.nativeElement,
    //     // html: '<app-edit-user></app-edit-user>',
    //     // confirmButtonText: 'Save',
    //     showConfirmButton: false,
    //     focusConfirm: false,
    //     showCloseButton: true,
    //     // showCancelButton: true,
    //     // cancelButtonText: 'Discard',
    //     preConfirm: () => {
    //       const firstName = Swal.getPopup().querySelector('#firstname')
    //       const lastName = Swal.getPopup().querySelector('#lastName')
    //       const displayName = Swal.getPopup().querySelector('#displayName')
    //       const bio = Swal.getPopup().querySelector('#bio')
    //       if (!firstName || !lastName || !displayName || !bio) {
    //         Swal.showValidationMessage(`Please enter login and password`)
    //       }
    //       return { firstName: firstName, lastName: lastName, displayName: displayName, bio: bio }
    //     }
    //   }).then((result) => {
    //     // Swal.fire(`
    //     //   Login: ${result.value.firstname}
    //     //   Password: ${result.value.password}
    //     // `.trim())
    //   })
  }

  show(id) {
    document.getElementById(id).style.display = 'block';
  }

  closeProfileArea() {
    this.profileButtonClicked.emit(false);
  }

  onSubmitUser() { }
}
