import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {OrderService} from '../_services';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {OrderRequest} from '../_models';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})

export class MyRequestsComponent implements OnInit {

  requests: OrderRequest[] = [];
  currentUserID: string;
  acceptResult: string;
  isSitter: boolean;


  constructor(
    private orderService: OrderService,
    private router: Router,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    localStorage.setItem('request_flag', '0');
    this.getMyRequests();
  }

  getMyRequests() {
    this.currentUserID = localStorage.getItem('currentUserID');
    const isSitter = localStorage.getItem('isSitter');
    this.isSitter = isSitter === 'true';
    this.orderService.getMyRequests(this.currentUserID).pipe(first()).subscribe(requests => {

      for (let re of requests) {
        if (new Date(re.expire) <= new Date() && re.status === 'REQUESTED') {
          re.status = 'INVALID';
        }
        this.requests.push(re);
      }
    });
  }

}
