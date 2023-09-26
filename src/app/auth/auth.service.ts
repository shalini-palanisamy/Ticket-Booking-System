import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
interface Authresponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  SignUp(email: string, password: string) {
    return this.http.post<Authresponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7MWws23nc1S9_w5CTKss9mR6mArtC5I8',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
  LogIn(email: string, password: string) {
    return this.http.post<Authresponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7MWws23nc1S9_w5CTKss9mR6mArtC5I8',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}
