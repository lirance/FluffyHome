import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AboutUsComponent} from './aboutUs/aboutUs.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login';
import {SignUpComponent} from './sign-up';

import {UserService} from './_services';

import {DashboardComponent} from './dashboard/dashboard.component';
import {DashhomeComponent} from './dashhome/dashhome.component';
import {CreateOrderComponent} from './create-order/create-order.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {OrderService} from './_services';

import {AlertService} from './_services';
import {AlertComponent} from './_directives';
import {UserprofileComponent} from './userprofile/userprofile.component';
import {AcceptDialogComponent} from './accept-dialog/accept-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MyOrderComponent} from './my-order/my-order.component';
import {CompleteDialogComponent} from './complete-dialog/complete-dialog.component';
import {CreatedOrderListComponent} from './created-order-list/created-order-list.component';
import {AcceptedOrderListComponent} from './accepted-order-list/accepted-order-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RateOrderDialogComponent} from './rate-order-dialog/rate-order-dialog.component';
import {PublicProfileComponent} from './public-profile/public-profile.component';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {MyPetsComponent} from './my-pets/my-pets.component';
import {AddPetComponent} from './add-pet/add-pet.component';
import {EditPetInfoComponent} from './editpetInfo/editpetinfo.component';
import {NgTempusdominusBootstrapModule} from 'ngx-tempusdominus-bootstrap';
import {SitterOrderComponent} from './sitter-order/sitter-order.component';
import {OrderlistsComponent} from './orderlists/orderlists.component';
import {RequestDialogComponent} from './request-dialog/request-dialog.component';
import {RequestsComponent} from './requests/requests.component';
import {ChangeOrderTypeDialogComponent} from './change-orderType-dialog/change-order-type-dialog.component';
import {MyRequestsComponent} from './my-requests/my-requests.component';
import {AllRequestComponent} from './all-request/all-request.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    DashhomeComponent,
    CreateOrderComponent,
    OrderDetailComponent,
    AlertComponent,
    UserprofileComponent,
    AcceptDialogComponent,
    ChangeOrderTypeDialogComponent,
    MyOrderComponent,
    AllRequestComponent,
    SitterOrderComponent,
    CompleteDialogComponent,
    CreatedOrderListComponent,
    AcceptedOrderListComponent,
    RateOrderDialogComponent,
    PublicProfileComponent,
    MyProfileComponent,
    MyPetsComponent,
    AddPetComponent,
    EditPetInfoComponent,
    OrderlistsComponent,
    RequestsComponent,
    MyRequestsComponent,
    RequestDialogComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    NgTempusdominusBootstrapModule

  ],
  providers: [
    OrderService,
    UserService,
    AlertService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AcceptDialogComponent,
    CompleteDialogComponent,
    RateOrderDialogComponent,
    RequestDialogComponent,
    ChangeOrderTypeDialogComponent
  ]
})

export class AppModule {
}
