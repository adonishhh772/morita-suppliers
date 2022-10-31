import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './Services/auth.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const expectedRole = route.data['expectedRole'];
      const token = localStorage.getItem('access_token')!;
      // decode the token to get its payload
      const tokenPayload:any = decode(token);
      if (
        !this.auth.loggedIn ||
        tokenPayload.role !== expectedRole
      ) {
        this.router.navigate(['login']);
        return false;
      }
      return true;
  }

}
