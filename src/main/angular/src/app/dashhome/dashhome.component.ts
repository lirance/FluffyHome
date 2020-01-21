import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {OrderService, UserService} from '../_services';
import {Router} from '@angular/router';
import {Order, User} from '../_models';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {RequestDialogComponent} from '../request-dialog/request-dialog.component';

@Component({
  selector: 'app-dashhome',
  templateUrl: './dashhome.component.html',
  styleUrls: ['./dashhome.component.css']
})

export class DashhomeComponent implements OnInit {

  p2psitters: User[] = [];
  sitters: User[] = [];
  currentUserID: string;
  acceptResult: string;
  switch_flag = 0;
  created_active = 'active';
  accepted_active = '';


  constructor(private userService: UserService, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.currentUserID = localStorage.getItem('currentUserID');
    this.switch_flag = Number(localStorage.getItem('sitter_flag'));
    if (this.switch_flag === 1) {
      this.switch_accepted();
    }
    this.getSitterList();
  }

  switch_created(): void {
    this.switch_flag = 0;
    localStorage.setItem('sitter_flag', '0');
    this.accepted_active = '';
    this.created_active = 'active';
  }

  switch_accepted(): void {
    this.switch_flag = 1;
    localStorage.setItem('sitter_flag', '1');
    this.accepted_active = 'active';
    this.created_active = '';
  }

  getSitterList() {
    this.userService.getP2PSitters(this.currentUserID).pipe(first()).subscribe(users => {
      this.p2psitters = users;
    });
    this.userService.getSitters().pipe(first()).subscribe(users => {
      this.sitters = users;
    });
  }

  sendRequest(userId: number, sitterType: boolean) {
    this.openRequestDialog(userId, sitterType);

  }

  openRequestDialog(userId: number, sitterType: boolean): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      userId: userId,
      sitterType: sitterType,
      acceptResult: this.acceptResult
    };

    this.dialog.open(RequestDialogComponent, dialogConfig);
  }


}
