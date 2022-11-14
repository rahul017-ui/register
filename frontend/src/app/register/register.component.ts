import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
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
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    //console.log(this.registerForm);
    this.userService.Register(this.registerForm.value).subscribe(res=>{
      this.registerForm.reset();
      this.router.navigate(['/login'])
    }
   );
  }
  get registerFormControl() {
    return this.registerForm.controls;
  }



}
