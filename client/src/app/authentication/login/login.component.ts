import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  isClientSelected = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
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
    return this.loginForm.controls;
  }

  setSelected() {
    this.isClientSelected = !this.isClientSelected;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    // this.router.navigate(['private-room']);
    this.authenticationService.login(this.f.email.value, this.f.password.value).subscribe(
      response => this.router.navigate(['private-room']),
      error =>
        Swal.fire(
          {
            title: 'An error occurred',
            text: 'Email or password is invalid',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#f27474'
          }
        )
    );
  }
}
