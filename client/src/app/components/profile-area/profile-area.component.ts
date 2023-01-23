import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

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
  user = [
    {
      id: 1,
      firstName: 'Jane',
      lastName: 'Doe',
      displayName: 'the_mighty_jane',
      status: 'Online',
      phone: '0751234567',
      bio: 'A bunch of words written here. A bunch of words written here. A bunch of words written here.',
    }
  ];
  room: string;
  showEditUserForm: boolean;
  @ViewChild('userForm', { static: false })
  userForm: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.EditUserForm = this.formBuilder.group({
      firstName: ['Esther', [Validators.required, Validators.minLength(2)]],
      lastName: [this.user[0].lastName, [Validators.required, Validators.minLength(2)]],
      displayName: [this.user[0].displayName, [Validators.required, Validators.minLength(2)]],
      status: [this.user[0].status, [Validators.required]],
      telephone: [this.user[0].phone, [Validators.required]],
      bio: [this.user[0].bio, [Validators.required, Validators.minLength(50)]],
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
