import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AboutUsComponent} from './aboutUs/aboutUs.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login';
import {SignUpComponent} from './sign-up';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DashhomeComponent} from './dashhome/dashhome.component';
import {CreateOrderComponent} from './create-order/create-order.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {UserprofileComponent} from './userprofile/userprofile.component';
import {MyOrderComponent} from './my-order/my-order.component';
import {PublicProfileComponent} from './public-profile/public-profile.component';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {MyPetsComponent} from './my-pets/my-pets.component';
import {AddPetComponent} from './add-pet/add-pet.component';
import {EditPetInfoComponent} from './editpetInfo/editpetinfo.component';
import {SitterOrderComponent} from './sitter-order/sitter-order.component';
import {OrderlistsComponent} from './orderlists/orderlists.component';
import {RequestsComponent} from './requests/requests.component';
import {MyRequestsComponent} from './my-requests/my-requests.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'aboutUs', component: AboutUsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {path: '', redirectTo: 'dashhome', pathMatch: 'full'},
      {path: 'dashhome', component: DashhomeComponent, outlet: 'aux'},
      {path: 'orderlists', component: OrderlistsComponent, outlet: 'aux'},
      {path: 'requests', component: RequestsComponent, outlet: 'aux'},
      {path: 'myRequests', component: MyRequestsComponent, outlet: 'aux'},
      {path: 'profile', component: UserprofileComponent, outlet: 'aux'},
      {path: 'createorder', component: CreateOrderComponent, outlet: 'aux'},
      {path: 'myorder', component: MyOrderComponent, outlet: 'aux'},
      {path: 'sitterorder', component: SitterOrderComponent, outlet: 'aux'},
      {path: 'orderdetail/:orderId', component: OrderDetailComponent, outlet: 'aux'},
      {path: 'publicprofile/:userid', component: PublicProfileComponent, outlet: 'aux'},
      {path: 'myprofile/:userid', component: MyProfileComponent, outlet: 'aux'},
      {path: 'mypets/:userid', component: MyPetsComponent, outlet: 'aux'},
      {path: 'addpet', component: AddPetComponent, outlet: 'aux'},
      {path: 'editpet/:petid', component: EditPetInfoComponent, outlet: 'aux'}
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true, onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
