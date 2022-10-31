import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {delay, map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';

interface LoginResult {
    token: string;
}


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly apiUrl = `${environment.apiUrl}`;
    private timer: Subscription | undefined;

    constructor(private http: HttpClient, private router: Router, public jwtHelper: JwtHelperService) {
    }

    login(email: string, password: string): Observable<any> {
            return this.http.post<LoginResult>(`${this.apiUrl}users/login`, {
                email: email,
                password: password
                // this is the common approach for eevery api in every langugage look at rest api in flask
            }, {
                headers:
                    {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
            })
                .pipe(
                    map(result => {
                        this.setLocalStorage(result);
                        this.startTokenTimer();
                        return result;
                    })
                );

    }

    register(email: string, password: string): Observable<any> {
      return this.http.post<LoginResult>(`${this.apiUrl}users/register`, {
          email: email,
          password: password
          // this is the common approach for eevery api in every langugage look at rest api in flask
      }, {
          headers:
              {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
      })
          .pipe(
              map(result => {
                  this.setLocalStorage(result);
                  this.startTokenTimer();
                  return result;
              })
          );

}

    logout(): any {
        this.clearStorage();
        this.stopTokenTimer();
    }

    public get loggedIn(): boolean {
       const token = localStorage.getItem('access_token')!;
      return !this.jwtHelper.isTokenExpired(token);
    }

    private getTokenRemainingTime() {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            return 0;
        }
        const tokenPayload:any = decode(accessToken);
        const expires = new Date(tokenPayload.exp * 1000);
        return expires.getTime() - Date.now();
    }

    //
    private startTokenTimer() {
        const timeout = this.getTokenRemainingTime();
        this.timer = of(true)
            .pipe(
                delay(timeout),
                tap(() => {
                        this.refreshToken();
                    }
                )
            )
            .subscribe();
    }

    //
    private stopTokenTimer() {
        this.timer?.unsubscribe();
    }

    refreshToken() {
        this.logout();
        this.router.navigate(['/login']);
    }

    private setLocalStorage(result: any): any {
        localStorage.setItem('access_token', result.token);
        // localStorage.setItem('userId', result.userId);
        // localStorage.setItem('userName', result.userName);
        // localStorage.setItem('userRole', result.userRole);
        // localStorage.setItem('userBranch', result.branch);
    }

    // public get userId(): any {
    //     return (localStorage.getItem('userId'));
    // }

    // public get userName(): any {
    //     return (localStorage.getItem('userName'));
    // }

    // public get userRole(): any {
    //     return (localStorage.getItem('userRole'));
    // }

    private clearStorage() {
        localStorage.removeItem('access_token');
        // localStorage.removeItem('userId');
        // localStorage.removeItem('userName');
        // localStorage.removeItem('userRole');
        // localStorage.removeItem('branch');
    }
}
