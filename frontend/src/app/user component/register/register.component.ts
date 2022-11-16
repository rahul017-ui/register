import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    contact: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private userService: UserService, private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit() {

    this.userService.Register(this.registerForm.value).subscribe(res => {
      this.toastr.success('Register successfully', 'Success!');
      this.userService.setAuthToken(res.token);
      this.registerForm.reset();
      this.router.navigate(['/task'])
    }, error=>{
      console.log(error);
     this.toastr.error(error.message, 'Error!');
   });
  }
  get registerFormControl() {
    return this.registerForm.controls;
  }



}
