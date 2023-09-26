import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-logIn',
  templateUrl: './logIn.component.html',
  styleUrls: ['./logIn.component.css'],
})
export class LogInComponent implements OnInit {
  logInForm: FormGroup;
  isLoading = false;
  error = null;
  constructor(
    private authService: AuthService,
    private route: Router,
    private router: ActivatedRoute
  ) {}
  ngOnInit() {
    this.logInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  Onsubmit() {
    console.log(this.logInForm);
    if (!this.logInForm.valid) return;
    const email = this.logInForm.value.email;
    const password = this.logInForm.value.password;
    this.isLoading = true;
    this.authService.LogIn(email, password).subscribe(
      (res) => {
        console.log(res);
        this.isLoading = false;
        this.route.navigate(['viewBus'], { relativeTo: this.router });
      },
      (errorRes) => {
        this.isLoading = false;
        this.error = 'Invalid Email or PassWord';
      }
    );
  }
}
