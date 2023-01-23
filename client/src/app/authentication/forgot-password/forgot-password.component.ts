import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
// import { AuthenticationService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
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
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.required],
    });
    // this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    setInterval(() => this.setSelected(), 25000)
  }

  get f() {
    return this.forgotPasswordForm.controls;
  }

  setSelected() {
    this.isClientSelected = !this.isClientSelected;
  }

  onSubmit() {
    this.submitted = true;
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.router.navigate(['authenticate/change-password']);
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
