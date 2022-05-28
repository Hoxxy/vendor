import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:1313/api/user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserApiService {
  constructor(private httpClient: HttpClient) { }

  loadProfile = (): Observable<any> => {
    return this.httpClient.post(`${API_URL}/load_profile`, httpOptions);
  }

  update = (data: any): Observable<any> => {
    return this.httpClient.post(`${API_URL}/update`, {data}, httpOptions);
  }
}
