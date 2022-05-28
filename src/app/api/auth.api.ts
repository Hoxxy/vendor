import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:1313/api/auth';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthApiService {
  constructor(private httpClient: HttpClient) { }

  signIn = (email: string, password: string): Observable<any> => {
    return this.httpClient.post(`${API_URL}/signin`, {email, password}, httpOptions);
  }

  signUp = (email: string, password: string, profileData: any): Observable<any> => {
    return this.httpClient.post(`${API_URL}/signup`, {email, password, profileData}, httpOptions)
  }
}
