import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../_services';
import {first} from 'rxjs/operators';
import {User} from '../_models';
import {Location} from '@angular/common';

@Component({
  selector: 'app-public-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  currentUser: User;
  isSitter: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private location: Location) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const userid = this.route.snapshot.paramMap.get('userid');
    this.userService.getUserById(userid).pipe(first()).subscribe(result => {
      this.currentUser = result;
      this.isSitter = result.userType === 'SITTER';
    });
  }

  backtolast() {
    this.location.back();
  }

}
