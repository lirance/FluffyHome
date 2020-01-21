import {Component, OnInit} from '@angular/core';
import {AlertService, UserService} from '../_services';
import {NavigationEnd, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../_models';
import {first} from 'rxjs/operators';
import {Location} from '@angular/common';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  profileForm: FormGroup;
  loading = false;
  submitted = false;
  currentUserID: string;
  currentUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private location: Location
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.profileForm = this.formBuilder.group({
      userId: [this.currentUser.userId, Validators.required],
      userName: [this.currentUser.username, Validators.required],
      phone: [this.currentUser.phone, Validators.required],
      email: [this.currentUser.email, Validators.required],
      zip: [this.currentUser.zip, Validators.required],
      address: [this.currentUser.address, Validators.required],
      monday: this.currentUser.avaliableWeekday.monday,
      tuesday: this.currentUser.avaliableWeekday.tuesday,
      wednesday: this.currentUser.avaliableWeekday.wednesday,
      thursday: this.currentUser.avaliableWeekday.thursday,
      friday: this.currentUser.avaliableWeekday.friday,
      saturday: this.currentUser.avaliableWeekday.saturday,
      sunday: this.currentUser.avaliableWeekday.sunday,
      credits: [this.currentUser.credits],
      rateNumber: [this.currentUser.rateNumber, Validators.required],
      averageRate: [this.currentUser.averageRate]
    });

  }

  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }

    this.loading = true;

    this.currentUser.avaliableWeekday.monday = this.profileForm.value.monday;
    this.currentUser.avaliableWeekday.tuesday = this.profileForm.value.tuesday;
    this.currentUser.avaliableWeekday.wednesday = this.profileForm.value.wednesday;
    this.currentUser.avaliableWeekday.thursday = this.profileForm.value.thursday;
    this.currentUser.avaliableWeekday.friday = this.profileForm.value.friday;
    this.currentUser.avaliableWeekday.saturday = this.profileForm.value.saturday;
    this.currentUser.avaliableWeekday.sunday = this.profileForm.value.sunday;

    this.userService.profileEdit(this.profileForm.value.userId, this.profileForm.value.phone,
      this.profileForm.value.userName, this.profileForm.value.email, this.profileForm.value.zip, this.profileForm.value.address,
      this.currentUser.avaliableWeekday
    )
      .pipe(first())
      .subscribe(
        data => {
          data.toString();
          if (data) {
            console.log('update successful');
            this.currentUserID = localStorage.getItem('currentUserID');
            localStorage.removeItem('currentUser');
            this.userService.getUserById(this.currentUserID).pipe(first()).subscribe(user => {
              this.currentUser = user;
              localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            });
            // this.router.navigate(['/dashboard', {outlets: {'aux': ['dashhome']}}]);
            this.location.back();
          }

          if (!data) {
            console.log('update error');
          }

        });
  }

  backtolast() {
    this.location.back();
  }

}
