import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from '../_models/user';
import {AvaliableWeekday} from '../_models/avaliableWeekday';

@Injectable()

export class UserService {
  private avaliableWeekday: AvaliableWeekday;

  constructor(private http: HttpClient) {
  }

  login(phone: string, password: string) {

    return this.http.get<string>(`http://localhost:8080/user/login/getId?phone=` + phone + `&password=` + password);
  }

  signup(user: User) {
    // tslint:disable-next-line:max-line-length
    return this.http.post(`http://localhost:8080/user/register?phone=` + user.phone + `&email=` + user.email + `&password=` + user.password + `&username=` + user.username + `&address=` + user.address + `&zip=` + user.zip + `&userType=` + user.userType, user);
  }

  getUserByphone(phone: string) {
    return this.http.post(`http://localhost:8080/user/getUserByPhone?phone=` + phone, phone);
  }

  getUserById(id: string) {
    return this.http.get<User>(`http://localhost:8080/user/getUserById?userid=` + id);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('currentUser');
    localStorage.clear();

  }

  profileEdit(userid: string, phone: string, username: string, email: string,
              zip: string, address: string, avaliableWeekday: AvaliableWeekday) {

    return this.http.get<String>('http://localhost:8080/user/editProfile?userid=' + userid
      + '&phone=' + phone + '&email=' + email + '&username=' + username + '&zip=' + zip + '&address=' + address
      + '&avaliableWeekday=' + JSON.stringify(avaliableWeekday));
  }

}

