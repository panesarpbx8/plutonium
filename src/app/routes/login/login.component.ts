import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormState } from 'src/app/shared/types/login';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/types/user';
import { AuthService } from 'src/app/shared/access/auth.service';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { FormsModule } from '@angular/forms';
import { SeoService } from 'src/app/shared/access/seo.service';
import { constants } from 'src/app/app.constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private formState: LoginFormState = 'login';

  user$: Observable<User> = this.auth.user$;

  displayName: string;
  email: string;
  password: string;
  simpleError: string;
  oAuthError: string;

  constructor(
    private auth: AuthService,
    private seo: SeoService, 
  ) { }

  ngOnInit(): void {
    this.seo.setTitle(constants.brand + ' - Login');
  }

  async handleSubmit() {
    try {
      if (this.formState === 'login') {
        await this.auth.login({ 
          email: this.email, 
          password: this.password 
        });
      } 
  
      if (this.formState === 'sign-up') {
        await this.auth.createAccount({ 
          displayName: this.displayName, 
          email: this.email, 
          password: this.password 
        });
      }
  
      if (this.formState === 'reset-password') {
        await this.auth.resetPassword({ 
          email: this.email 
        });
      }
    } catch (e) {
      this.simpleError = e.message;
    }
  }
  
  async handleOAuthLogin(provider: string) {
    try {
      if (provider === 'google') {
        await this.auth.oAuthLogin(new GoogleAuthProvider());
      }
      
      if (provider === 'github') {
        await this.auth.oAuthLogin(new GithubAuthProvider());
      }
    } catch (e) {
      this.oAuthError = e.message || e.code || 'Unknown Oauth error';
    }
  }

  clearErrors() {
    this.simpleError = '';
    this.oAuthError = '';
  }

  setFormState(formState: LoginFormState) {
    this.formState = formState;
  }

  get isLoginForm(): boolean {
    return this.formState === 'login';
  }

  get isSignUpForm(): boolean {
    return this.formState === 'sign-up';
  } 

  get isResetPasswordForm(): boolean {
    return this.formState === 'reset-password';
  }
}
