import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private userService: UserService, private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.userService.login(this.loginForm.value).subscribe(res => {
      this.toastr.success('Login successfully', 'Success!');
      this.userService.setAuthToken(res.token);
      this.loginForm.reset(),
      this.router.navigate(['/task'])
    }, error=>{
       console.log(error);
      this.toastr.error(error.message, 'Error!');
    });
  }
  get loginFormControl() {
    return this.loginForm.controls;
  }
}
