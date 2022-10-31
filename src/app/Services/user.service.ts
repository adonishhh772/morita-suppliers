import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}users/`;
  token = localStorage.getItem('access_token')!;
  constructor(private http: HttpClient) { }

  getUsers(id:any): Observable<any>{
    return this.http.get<any>(`${this.apiUrl + id}`, {
      headers:
          {'authorization': this.token}
  })
      .pipe(
          map(result => {
              return result;
          })
      );
  }

  updateProfile(data: any): Observable<any> {
    const tokenPayload:any = decode(this.token);
    return this.http.put<any>(`${this.apiUrl + tokenPayload.id}`, data, {
        headers:
            {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*','authorization': this.token}
    })
        .pipe(
            map(result => {
                return result;
            })
        );
  }

  blackListContact(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl +'blacklist/' + id}`,{ headers:{'authorization': this.token}}).pipe(
        map(result => {
            return result;
        })
    );
  }

  whiteListContact(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl +'whitelist/' + id}`,{ headers:{'authorization': this.token}}).pipe(
        map(result => {
            return result;
        })
    );
  }
}
