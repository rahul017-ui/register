import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm = new FormGroup({ 
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),

  });

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.login(this.registerForm.value).subscribe(res=>{
      this.registerForm.reset();
    // localStorage.setItem('res', JSON.stringify(res));
      
      this.router.navigate(['/task'])
    }
   );
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }
}
