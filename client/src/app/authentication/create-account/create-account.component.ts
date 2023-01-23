import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/auth.service';
// import { data } from 'jquery';
import Swal from 'sweetalert2';
import { CountryISO } from 'ngx-intl-tel-input';
import { SearchCountryField } from 'ngx-intl-tel-input';
import { PhoneNumberFormat } from 'ngx-intl-tel-input';
import { User } from 'src/app/models/user.model';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  createAccountForm: FormGroup;
  isPasswordStrong: boolean;
  submitted = false;
  isAllowedImage = true;
  returnUrl: string;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.Uganda
  ];
  uploadedImage: File;
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


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
    this.createAccountForm = new FormGroup({
      first_name: new FormControl(
        '',
        [Validators.required, Validators.minLength(2)]
      ),
      last_name: new FormControl(
        '',
        [Validators.required, Validators.minLength(2)]),
      alias_name: new FormControl(
        '',
        [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      telephone: new FormControl('', Validators.required),
      bio: new FormControl('', Validators.required),
      password: new FormControl(
        '',
        [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required),
      terms: new FormControl('', Validators.required)
    }, this.checkPasswords);
  }

  get f() {
    return this.createAccountForm.controls;
  }

  /**
   * Checks for same passwords
   * @param formGroup element
   * @return notSame: boolean
   */
  checkPasswords(formGroup: FormGroup) {
    const pass = formGroup.get('password').value;
    const confirmPass = formGroup.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  }

  /**
   * Sets the strength of the password
   * @param strength of the password
   * @return password strength: boolean
   */
  passwordStrong(strength: boolean) {
    this.isPasswordStrong = strength;
  }

  // setSelected() {
  //   this.isClientSelected = !this.isClientSelected;
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


  onSubmit() {
    let formData: User;
    let formInfo;
    formData = Object.assign({}, this.createAccountForm.value);
    formInfo = new FormData();
    this.submitted = true;
    if (this.createAccountForm.invalid ||
      !this.f.terms.value ||
      !this.isPasswordStrong) {
      return;
    }
    formData.telephone = this.f.telephone.value.e164Number;
    this.authenticationService.register(formData)
      .subscribe(data => {
        Swal.fire({
          title: '',
          text: 'Account Created!',
          icon: 'success',
          confirmButtonColor: '#1D8AE5',
        })
      }, error => {
        console.log(error)
      });
  }

  // sendVerification(id) {
  //   this.authenticationService.sendVerification(id)
  //     .subscribe(response => {
  //       this.router.navigate(['authenticate/confirm']);
  //     },
  //       error => {
  //         Swal.fire('Oops...', 'Sending activation code failed', 'error');
  //       }
  //     );
  // }
}
