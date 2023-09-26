import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signIn',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.css'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  error = null;
  isLoading = false;
  constructor(
    private authService: AuthService,
    private route: Router,
    private router: ActivatedRoute
  ) {}
  ngOnInit() {
    this.signInForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        this.passwordFormField(),
      ]),
    });
  }
  Onsubmit() {
    console.log(this.signInForm);
    if (!this.signInForm.valid) return;
    const email = this.signInForm.value.email;
    const password = this.signInForm.value.password;
    this.isLoading = true;
    this.authService.SignUp(email, password).subscribe(
      (res) => {
        this.isLoading = false;
        this.route.navigate(['../logIn'], { relativeTo: this.router });
      },
      (errorRes) => {
        this.isLoading = false;
        this.error = errorRes.error.error.message;
      }
    );
  }
  passwordFormField() {
    return (control) => {
      const password = control.value as string;
      if (!password) {
        return null; // No validation error if the password is empty
      }
      const regex =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!regex.test(password)) {
        return { strongPassword: true };
      }
      return null; // Password is strong
    };
  }
}
