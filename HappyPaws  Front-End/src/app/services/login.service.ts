import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../models/jwtRequest';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = `${base_url}/login`
  constructor(private http: HttpClient) {}

  login(request: JwtRequest) {
    return this.http.post(this.url, request);
  }
  verificar() {
    if (typeof sessionStorage !== 'undefined') {
        let token = sessionStorage.getItem('token');
        return token != null;
    }
    return false;
  }

  showRole() {
    if (typeof sessionStorage !== 'undefined') {
        let token = sessionStorage.getItem('token');
        if (!token) {
            return null;
        }
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token);
        return decodedToken?.role;
    }
    return null;
  }
  
}