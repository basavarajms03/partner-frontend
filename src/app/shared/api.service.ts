import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

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
