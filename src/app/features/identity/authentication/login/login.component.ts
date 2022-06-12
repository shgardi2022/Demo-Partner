import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { validateAllFormFields, hasError } from 'src/app/core/base/base';
import { UserService } from 'src/app/core/common-services/user.service';
import { AuthenticationDataService } from 'src/app/core/data-services/identity/authentication.data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  hasError = hasError;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)])
  });

  constructor(private authService: AuthenticationDataService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }
  login() {

    if (!this.loginForm.valid) {
      validateAllFormFields(this.loginForm);
      return;
    }

    this.authService.login(this.userService.getCurrentSystemLanguage(), { userName: this.loginForm.get('email')?.value, password: this.loginForm.get('password')?.value }
      //  email: this.loginForm.get('email')?.value, password: this.loginForm.get('password')?.value }
    ).subscribe(res => {
      if (res.access_token) {
        this.userService.setToken(res.access_token.toString());
      } else {
        throw new Error("LoginResultMustReturnAccessToken");
      }

      if (res.refreshToken) {
        this.userService.setRefreshToken(res.refreshToken.toString());
      } else {
        throw new Error("LoginResultMustReturnRefreshToken");
      }

      if (res.caverImage) {
        this.userService.setProfileImage(environment.appCDNConfig.identityCDNServiceBaseUrl + '/' + res.caverImage)
      }
      if (res.userName) {
        this.userService.setUserName(res.userName)
      }
      this.router.navigate(['/home']);
    })
  }
}