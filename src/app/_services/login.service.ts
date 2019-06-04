import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { UsuarioInfo, CustomerDetail } from '../_entities/usuarioInfo.entity';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<CustomerDetail>;
  public currentUser: Observable<CustomerDetail>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<CustomerDetail>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): CustomerDetail {
    return this.currentUserSubject.value;
  }

  public getUser(): CustomerDetail {
      return  JSON.parse(localStorage.getItem('currentUser'));
  }

  getLogo() {
    return this.http.get<any>(`${environment.apiUrl}/auth/logo`);
  }

  getLoginImage() {
    return this.http.get<any>(`${environment.apiUrl}/auth/image`);
  }

  getImage() {
    return this.http.get<any>(`http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US`);
  }


  login(username: string, password: string) {
    return this.http.post<CustomerDetail>(`${environment.apiUrl}/auth/authenticate`, {
      Login: username, Pass: password
    })
      .pipe(map(data => {
        // login successful if there's a jwt token in the response
        if (data && data.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.currentUserSubject.next(data);
        }
        return data;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }
}
