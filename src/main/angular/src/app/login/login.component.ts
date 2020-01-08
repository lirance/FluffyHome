import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../_services';
import {first} from 'rxjs/operators';
import {User} from '../_models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  currentUserID: number;
  isSitter: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      phone: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.userService.login(this.loginForm.controls['phone'].value, this.loginForm.controls['password'].value).pipe(first()).subscribe(
      data => {

        if (data !== null) {
          this.currentUserID = data.userid;
          this.isSitter = data.userType === 'SITTER';
          localStorage.setItem('isSitter', JSON.stringify(this.isSitter));
          localStorage.setItem('currentUserID', JSON.stringify(this.currentUserID));
          if (data.userType === 'SITTER') {
            this.router.navigate(['/dashboard', {outlets: {'aux': ['orderlists']}}]);
          } else {
            this.router.navigate(['/dashboard', {outlets: {'aux': ['dashhome']}}]);
          }
        }

        if (data === null) {
          this.loginForm.controls['password'].setErrors({
            invalidLogin: true
          });
        }
      });


  }


}
