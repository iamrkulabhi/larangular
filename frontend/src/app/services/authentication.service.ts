import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loginUpApi = 'http://localhost:8000/api/auth/login';
  signUpApi = 'http://localhost:8000/api/auth/signup';
  resetPasswordLinkApi = 'http://localhost:8000/api/auth/send-password-reset-link';
  changePasswordApi = 'http://localhost:8000/api/auth/change-password';

  private iss = {
    login: this.loginUpApi,
    signup: this.signUpApi
  };

  constructor(private _http: HttpClient) { }

  signupMethod(formData) {
    return this._http.post(this.signUpApi, formData);
  }

  loginMethod(formData) {
    return this._http.post(this.loginUpApi, formData);
  }

  handleApiToken(accessToken: string) {
    localStorage.setItem('access_token', accessToken);
    // console.log(this.isValidToken(this.getStoredApiToken()));
  }

  getStoredApiToken() {
    return localStorage.getItem('access_token');
  }

  removeApiToken() {
    localStorage.removeItem('access_token');
  }

  isValidToken(accessToken: string) {
    if (this.getStoredApiToken()) {
      const payload = this.getPayloadFromAccessToken(this.getStoredApiToken());
      // console.log(payload);
      return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
    }
    return false;
  }

  getPayloadFromAccessToken(accessToken: string) {
    const payload =  accessToken.split('.')[1];
    return this.decodePayload(payload);
  }

  decodePayload(payload: string) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValidToken(this.getStoredApiToken());
  }

  resetPasswordLink(formData) {
    return this._http.post(this.resetPasswordLinkApi, formData);
  }

  changePassword(formData) {
    return this._http.post(this.changePasswordApi, formData);
  }
}
