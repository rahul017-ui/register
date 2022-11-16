import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.userService.login(this.loginForm.value).subscribe(res => {
      this.userService.setAuthToken(res.token);
      this.loginForm.reset(),
      this.router.navigate(['/task'])
    });
  }
  get loginFormControl() {
    return this.loginForm.controls;
  }
}
