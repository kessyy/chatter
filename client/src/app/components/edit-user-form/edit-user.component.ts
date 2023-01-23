import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
// import { AuthenticationService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { ChatService } from '../../services/chat.service';
import { CountryISO } from 'ngx-intl-tel-input';
import { SearchCountryField } from 'ngx-intl-tel-input';
import { PhoneNumberFormat } from 'ngx-intl-tel-input';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  chatData: any = [];
  submitted: boolean;
  user = [
    {
      id: 1,
      firstName: 'Jane',
      lastName: 'Doe',
      displayName: 'the_mighty_jane',
      status: 'Online',
      phone: '751234567',
      bio: 'A bunch of words written here. A bunch of words written here. A bunch of words written here.',
    }
  ];
  room: string;
  message: string;
  @Input() maxHeight: string;
  @Input() isEditUser: boolean;
  @Input() isCloseEditUser: boolean;
  @Output() openEditForm = new EventEmitter<boolean>();
  searchForm: FormGroup;
  messageForm: FormGroup;
  EditUserForm: FormGroup;
  showEditUserForm: boolean;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.Uganda
  ];
  uploadedImage: File;
  uploadedCV: File;
  imageChangedEvent: any = '';
  tempCroppedImage: string;
  croppedImage: string;
  canvasRotation = 0;
  rotation?: number;
  translateH = 0;
  translateV = 0;
  scale = 1;
  aspectRatio = 4 / 3;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imageURL?: string;
  loading: boolean = false;
  isAllowedImage: boolean;
  // @Output() closeEditForm = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    // private authenticationService: AuthenticationService,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.EditUserForm = this.formBuilder.group({
      firstName: [this.user[0].firstName, [Validators.required, Validators.minLength(2)]],
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

  // closeEditUser() {
  //   document.getElementById('edit-user-form').style.display = 'none';
  //   document.getElementById('myModal').style.display = 'none';
  // }

  onImageChange(event: any): void {
    this.loading = true;
    this.imageChangedEvent = event;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg') {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        this.isAllowedImage = true;
        reader.onload = () => {
          const img = new Image();
          img.src = reader.result as string;
          img.onload = () => {
            if ((img.naturalWidth <= 400) && (img.naturalHeight <= 400) && file.size < 2000000) {
              this.isAllowedImage = true;
              this.croppedImage = img.src
            } else {
              this.isAllowedImage = false;
              this.openModal();
            }
          };
        }
      }
      this.uploadedImage = event.target.files[0];
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.tempCroppedImage = event.base64;
  }

  cropImage() {
    this.croppedImage = this.tempCroppedImage
    this.isAllowedImage = true;
    this.onCloseHandled();
  }

  imageLoaded() {
    this.showCropper = true;
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    this.loading = false;
  }

  loadImageFailed() {
    console.error('Load image failed');
  }

  openModal() {
    document.querySelector('.modal').classList.add('is-open');
    document.querySelector('.modal-overlay').classList.add('is-open');
  }

  onCloseHandled() {
    document.querySelector('.modal').classList.remove('is-open');
    document.querySelector('.modal-overlay').classList.remove('is-open');
  }

  rotateLeft() {
    this.loading = true;
    setTimeout(() => { // Use timeout because rotating image is a heavy operation and will block the ui thread
      this.canvasRotation--;
      this.flipAfterRotate();
    });
  }

  rotateRight() {
    this.loading = true;
    setTimeout(() => {
      this.canvasRotation++;
      this.flipAfterRotate();
    });
  }

  moveLeft() {
    this.transform = {
      ...this.transform,
      translateH: ++this.translateH
    };
  }

  moveRight() {
    this.transform = {
      ...this.transform,
      translateH: --this.translateH
    };
  }

  moveTop() {
    this.transform = {
      ...this.transform,
      translateV: ++this.translateV
    };
  }

  moveBottom() {
    this.transform = {
      ...this.transform,
      translateV: --this.translateV
    };
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
    this.translateH = 0;
    this.translateV = 0;
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }

  toggleAspectRatio() {
    this.aspectRatio = this.aspectRatio === 4 / 3 ? 16 / 5 : 4 / 3;
  }

  onRemoveImge() {
    this.croppedImage = null;
  }

  show(id) {
    document.getElementById(id).style.display = 'block';
  }

  closeEditUser() {
    this.openEditForm.emit(false);
    document.getElementById('popup1').style.display = 'none';
  }

  onSubmitUser() {
    // let formData: User = Object.assign({}, this.EditUserForm.value);
    // let formInfo;
    // formData = Object.assign({}, this.EditUserForm.value);
    // formInfo = new FormData();
    this.submitted = true;
    if (this.EditUserForm.invalid) {
      return;
    }

    // this.userProfileService.editUser(formData, this.user.id)
    //   .pipe(first()).subscribe(response => {
    //     this.handleResponse(true);
    //   },
    //     error => {
    //       this.handleResponse(false);
    //       console.error('error', error)
    //     });

    this.showEditUserForm = false;
  }

  handleResponse(isSuccess: boolean) {
    if (isSuccess) {
      Swal.fire({
        title: '',
        text: 'Account has been updated successfully',
        icon: 'success',
        confirmButtonColor: '#7476F5',
      }).then(() => {
        this.showEditUserForm = false;
      });
    }
  }
}
