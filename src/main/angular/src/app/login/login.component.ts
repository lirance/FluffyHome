import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../_services';
import {first} from 'rxjs/operators';

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
          this.currentUserID = data.userId;
          this.isSitter = data.userType === 'SITTER';
          localStorage.setItem('isSitter', JSON.stringify(this.isSitter));
          localStorage.setItem('currentUserID', JSON.stringify(this.currentUserID));
          localStorage.setItem('request_flag', '0');
          localStorage.setItem('order_flag', '0');
          localStorage.setItem('sitter_flag', '0');
          this.router.navigate(['/dashboard', {outlets: {'aux': ['orderlists']}}]);
        }

        if (data === null) {
          this.loginForm.controls['password'].setErrors({
            invalidLogin: true
          });
        }
      });


  }


}
