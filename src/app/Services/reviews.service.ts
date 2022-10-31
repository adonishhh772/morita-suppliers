import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import decode  from 'jwt-decode';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class ReviewsService {
  private readonly apiUrl = `${environment.apiUrl}review/`;
  token = localStorage.getItem('access_token')!;
  constructor(private http:HttpClient) { }


  getAllReviews():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}`)
      .pipe(
          map(result => {
              return result;
          })
      );
  }

  add(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data, {
        headers:
            {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}

    })
        .pipe(
            map(result => {
                return result;
            })
        );
}
}
