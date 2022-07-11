import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User as FirebaseUser } from 'firebase/auth';
import { firstValueFrom, map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { LoginData, OAuthProvider, ResetPasswordData, SignUpData } from '../types/login';
import { User, UserData } from '../types/user';
import { DialogService } from './dialog.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  readonly user$: Observable<User>;
  private userInRedirect: string = '/profile';
  private userOutRedirect: string = '/';

  constructor(
    private firestore: Firestore, 
    private auth: Auth, 
    private router: Router, 
    private dialog: DialogService,
  ) { 
    this.user$ = authState(this.auth).pipe(
      switchMap(user => user ? this.fetchUserDoc(user) : of(null)),
      shareReplay(1),
    );
  }

  private fetchUserDoc(user: FirebaseUser): Observable<User> {
    return docData(doc(this.firestore, `users/${user.uid}`)).pipe(
      map((data: UserData) => ({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        saved: data.saved,
        isPro: data.isPro,
      })),
    );
  }

  async createAccount(data: SignUpData): Promise<void> {
    if (!data.displayName || !data.email || !data.password)
      throw Error('Insufficient information');
    
    const credential = await createUserWithEmailAndPassword(
      this.auth, 
      data.email, 
      data.password
    );
    
    await Promise.all([
      updateProfile(credential.user, { displayName: data.displayName }),
      this.updateUserDoc(credential.user)
    ]); 

    this.router.navigateByUrl(this.userInRedirect);
    this.welcomeDialog();
  }

  async login(data: LoginData): Promise<void> {
    if (!data.email || !data.password)
      throw Error('Invalid credentials');
    
    const credential = await signInWithEmailAndPassword(
      this.auth, 
      data.email, 
      data.password
    );

    this.router.navigateByUrl(this.userInRedirect);
    this.welcomeDialog();
  }

  async oAuthLogin(provider: OAuthProvider): Promise<void> {
    const credential = await signInWithPopup(this.auth, provider);
    
    const exists = await firstValueFrom(
      docData(doc(this.firestore, `users/${credential.user.uid}`))
    );

    if (!exists) {
      await this.updateUserDoc(credential.user);
    }

    this.router.navigateByUrl(this.userInRedirect);
    this.welcomeDialog();
  }

  async updateUserDoc(user: User | FirebaseUser, data?: UserData): Promise<void> {
    const payload: UserData = {
      isPro: false,
      saved: [],
    }

    if (data && data.isPro) payload.isPro = data.isPro;
    if (data && data.saved) payload.saved = data.saved;

    await setDoc(
      doc(this.firestore, `users/${user.uid}`), 
      payload, 
      { merge: true }
    );
  }

  async resetPassword(data: ResetPasswordData): Promise<void> {
    if (!data.email) 
      throw Error('Email required');
    
    await sendPasswordResetEmail(this.auth, data.email);

    this.passwordResetDialog();
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    this.router.navigateByUrl(this.userOutRedirect);

    this.logoutDialog();
  }

  private welcomeDialog(): void {
    this.dialog.next({
      heading: 'Welcome to Plutonium',
      subHeading: 'You can now save articles and view them later',
      successButtonText: 'Awesome!',
      type: 'success',
    });
  }

  private logoutDialog(): void {
    this.dialog.next({
      heading: 'You have been logged out',
      type: 'info',
      basicButtonText: 'Ok',
    });
  }

  private passwordResetDialog(): void {
    this.dialog.next({
      heading: 'Password reset email sent',
      subHeading: 'Please check your inbox for reset email',
      type: 'info',
      basicButtonText: 'Ok',
    });
  }

}
