import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../_services';
import {first} from 'rxjs/operators';
import {User} from '../_models';
import {Location} from '@angular/common';
import {Pet} from '../_models/Pet';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {
  currentUser: User;
  userPets: Pet[];
  avaliableWDS = '';

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private location: Location) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    let userid = this.route.snapshot.paramMap.get('userid');
    this.userService.getUserById(userid).pipe(first()).subscribe(result => {
      this.currentUser = result;
      if (result.avaliableWeekday.monday) {
        this.avaliableWDS = this.avaliableWDS + ' Mondays ,';
      }
      if (result.avaliableWeekday.tuesday) {
        this.avaliableWDS = this.avaliableWDS + ' Tuesdays ,';
      }
      if (result.avaliableWeekday.wednesday) {
        this.avaliableWDS = this.avaliableWDS + ' Wednesdays ,';
      }
      if (result.avaliableWeekday.thursday) {
        this.avaliableWDS = this.avaliableWDS + ' Thursdays ,';
      }
      if (result.avaliableWeekday.friday) {
        this.avaliableWDS = this.avaliableWDS + ' Fridays ,';
      }
      if (result.avaliableWeekday.saturday) {
        this.avaliableWDS = this.avaliableWDS + ' Saturdays ,';
      }
      if (result.avaliableWeekday.sunday) {
        this.avaliableWDS = this.avaliableWDS + ' Sundays ,';
      }

    });
    this.userService.getPets(userid).pipe(first()).subscribe(result => {
      this.userPets = result;
    });
  }

  backtolast() {
    this.location.back();
  }

}
