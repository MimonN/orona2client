import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isCollapsed: boolean = false;
  public isUserAuthenticated: boolean;
  public isUserAdmin: boolean;
  username: string = '';

  constructor(private authService: AuthenticationService, private router: Router, private toastr: ToastrService) {
    this.authService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
      if(this.isUserAuthenticated) {
        this.username = this.authService.getUsername();
      }
    });
    this.authService.authIsAdmin
    .subscribe(res => {
      this.isUserAdmin = res;
    })
  }

  ngOnInit(): void {
    this.authService.authChanged
      .subscribe(res => {
        this.isUserAuthenticated = res;
        if(this.isUserAuthenticated === true){
          this.isUserAdmin = this.authService.isUserAdmin();
        }
      })
  }

  public logout = () => {
    this.authService.logout();
    this.username = '';
    this.router.navigate(['/']);
    this.toastr.success("You have been sucessfully logged out.");
  }
}
