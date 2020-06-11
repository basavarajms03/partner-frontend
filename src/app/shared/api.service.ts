import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = environment.apiBaseUrl;
  admin = false;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('admin') === "true") {
      this.admin = true;
    } else {
      this.admin = false;
    }
  }

  getToken() {
    return localStorage.getItem('Token');
  }

  getLoggedIn() {
    return !!localStorage.getItem('Token');
  }

  post(url: string, body: any) {
    return this.http.post(this.apiUrl + url, body);
  }
}
