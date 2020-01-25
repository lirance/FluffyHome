import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {OrderService, UserService} from '../_services';
import {NavigationEnd, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {OrderRequest} from '../_models';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})

export class RequestsComponent implements OnInit {

  requests: OrderRequest[] = [];
  currentUserID: string;
  acceptResult: string;
  isSitter: boolean;


  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog) {
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
    localStorage.setItem('request_flag', '1');
    this.getRequests();
  }

  getRequests() {
    this.currentUserID = localStorage.getItem('currentUserID');
    const isSitter = localStorage.getItem('isSitter');
    this.isSitter = isSitter === 'true';
    this.orderService.getRequests(this.currentUserID).pipe(first()).subscribe(requests => {

      for (let re of requests) {
        if (new Date(re.expire) <= new Date() && re.status === 'REQUESTED') {
          re.status = 'INVALID';
        }
        this.requests.push(re);
      }
    });
  }

  response(orderId: number, accept: boolean) {
    this.orderService.responseRequest(orderId, Number(this.currentUserID), accept).pipe(first()).subscribe(result => {
      result.toString();
      console.log(result);
      // this.getRequests();
      // currentUserId
      const currentUserId = localStorage.getItem('currentUserID');
      localStorage.removeItem('currentUser');
      this.userService.getUserById(currentUserId).pipe(first()).subscribe(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
      });
      window.location.reload();
      //   this.acceptResult = result;
      //   this.openAcceptDialog();
    });

  }

}
