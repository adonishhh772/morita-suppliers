import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly apiUrl = `${environment.apiUrl}category/`;
  token = localStorage.getItem('access_token')!;
  constructor(private http: HttpClient) { }

  add(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data, {
        headers:
            {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*','authorization': this.token}

    })
        .pipe(
            map(result => {
                return result;
            })
        );
}

delCategory(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl + id}`,{headers:{'authorization': this.token}}).pipe(
        map(result => {
            return result;
        })
    );
}

updateCategory(data: any, id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl + id}`, data, {
        headers:
            {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*','authorization': this.token}
    })
        .pipe(
            map(result => {
                return result;
            })
        );
}
}
