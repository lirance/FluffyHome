import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../_services';
import {first} from 'rxjs/operators';
import {Location} from '@angular/common';
import {Pet} from '../_models';

@Component({
  selector: 'app-my-pets',
  templateUrl: './my-pets.component.html',
  styleUrls: ['./my-pets.component.css']
})
export class MyPetsComponent implements OnInit {
  currentUserId: string;
  petList: Pet[];

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private location: Location) {
  }

  ngOnInit() {
    this.getPets();
  }

  getPets() {
    this.currentUserId = this.route.snapshot.paramMap.get('userid');
    this.userService.getPets(this.currentUserId).pipe(first()).subscribe(result => {
      this.petList = result;
    });
  }

  backtolast() {
    this.location.back();
  }

}
