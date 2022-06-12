import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/core/common-services/user.service';
import { AuthenticationDataService } from 'src/app/core/data-services/identity/authentication.data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SHGARDI-PARTNER';
  currentSystemLanguage = 'en-US';
  constructor(private userService: UserService,
    public router: Router,
    private authenticationDataService: AuthenticationDataService,
    private translate: TranslateService) {
    this.currentSystemLanguage = this.userService.getCurrentSystemLanguage();
    this.translate.use(this.currentSystemLanguage);
    if (this.currentSystemLanguage === 'ar-SA') {
      document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
    }
    else {
      document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
    }

  }
  ngOnInit(): void {
    let that = this;
    setInterval(function () {
      if (that.isLoggedIn()) {
        that.authenticationDataService.refreshToken(that.userService.getCurrentSystemLanguage(), { accessToken: that.userService.getToken()!, refreshToken: that.userService.getRefreshToken()! }).subscribe(res => {
          that.userService.setToken(res.accessToken!);
          that.userService.setRefreshToken(res.refreshToken!);
        }, err => {
          that.userService.logout();
        })
      }
    }, 60 * 2 * 1000)
  }
  logout() {
    this.userService.logout();
  }
  isLoggedIn() {
    return this.userService.isLoggedIn();
  }
  changeLanguage(language: string) {
    this.userService.setLanguage(language);
    window.location.reload();
  }

  close() {
    document.getElementById('errorMsg')!.innerHTML = '';
    if (document.getElementsByClassName('error_toaster_show').length > 0)
      document.getElementsByClassName('error_toaster_show')[0].setAttribute('class', 'error_toaster');

    document.getElementById('successMsg')!.innerHTML = '';
    if (document.getElementsByClassName('success_toaster_show').length > 0)
      document.getElementsByClassName('success_toaster_show')[0].setAttribute('class', 'success_toaster');

    document.getElementById('warningMsg')!.innerHTML = '';
    if (document.getElementsByClassName('warning_toaster_show').length > 0)
      document.getElementsByClassName('warning_toaster_show')[0].setAttribute('class', 'warning_toaster');
  }
}