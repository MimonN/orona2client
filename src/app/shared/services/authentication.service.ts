import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { AuthResponseDto } from 'src/app/interfaces/response/authResponseDto.model';
import { RegistrationResponseDto } from 'src/app/interfaces/response/registrationResponseDto.model';
import { UserForAuthenticationDto } from 'src/app/interfaces/user/userForAuthenticationDto.model';
import { UserForRegistrationDto } from 'src/app/interfaces/user/userForRegistrationDto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseApiUrl: string = environment.baseApiUrl;
  private authChangeSub = new Subject<boolean>();
  public authChanged = this.authChangeSub.asObservable();
  private authIsAdminSub = new Subject<boolean>();
  public authIsAdmin = this.authIsAdminSub.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  public registerUser = (route: string, body: UserForRegistrationDto) => {
    return this.http.post<RegistrationResponseDto> (this.createCompleteRoute(route, this.baseApiUrl), body);
  }

  public loginUser = (route: string, body: UserForAuthenticationDto) => {
    return this.http.post<AuthResponseDto>(this.createCompleteRoute(route, this.baseApiUrl), body);
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");

    return token && !this.jwtHelper.isTokenExpired(token);
  }

  public isUserAdmin = (): boolean => {
    const token = localStorage.getItem("token");
    const decodedToken = this.jwtHelper.decodeToken(token);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    return role === 'Admin';
  }

  public sendIsUserAdminNotification = (isUserAdmin: boolean) => {
    this.authIsAdminSub.next(isUserAdmin);
  }

  public getUsername = (): string => {
    const token = localStorage.getItem("token");
    const decodedToken = this.jwtHelper.decodeToken(token);
    const name  = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

    return name;
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
}
