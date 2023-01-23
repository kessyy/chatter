import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
// import { AuthenticationService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  isPasswordStrong: boolean;
  submitted = false;
  returnUrl: string;
  isClientSelected = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    // private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      password: new FormControl(
        '',
        [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required)
    }, this.checkPasswords);
    // this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    setInterval(() => this.setSelected(), 25000)
  }

  get f() {
    return this.changePasswordForm.controls;
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

  setSelected() {
    this.isClientSelected = !this.isClientSelected;
  }

  onSubmit() {
    this.submitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }
    this.router.navigate(['private-room']);
    // this.authenticationService.login(this.f.email.value, this.f.password.value)
    //   .pipe(first()).subscribe(
    //     data => {
    //       if (this.authenticationService.isClient()) {
    //         if (this.returnUrl !== '/') {
    //           this.router.navigate([this.returnUrl]);
    //         } else {
    //           this.router.navigate(['client-dashboard']);
    //         }
    //       } else if (this.authenticationService.isAdmin()) {
    //         this.router.navigate(['admin']);
    //       } else {
    //         if (this.returnUrl !== '/') {
    //           this.router.navigate([this.returnUrl]);
    //         } else {
    //           this.router.navigate(['admin-dashboard']);
    //         }
    //       }
    //     },
    //     error => {
    //       Swal.fire({
    //         title: 'An error occurred',
    //         text: 'email or password invalid',
    //         icon: 'error',
    //         confirmButtonColor: '#f37b7b',
    //       });
    //       console.log('error message', error)
    //     });
  }
}
