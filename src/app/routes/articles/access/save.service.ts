import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/access/auth.service';
import { DialogService } from 'src/app/shared/access/dialog.service';
import { User } from 'src/app/shared/types/user';

@Injectable({ providedIn: 'root' })
export class SaveService {

  private user: User;

  constructor(private auth: AuthService, private dialog: DialogService) {
    this.auth.user$.subscribe(user => {
      this.user = user;
    });
  }

  async save(slug: string): Promise<void> {
    this.user.saved.push(slug);
    await this.auth.updateUserDoc(this.user, {
      saved: this.user.saved,
      isPro: this.user.isPro,
    });
    
    this.dialog.next({
      heading: 'Article saved',
      type: 'success',
      basicButtonText: 'Ok',
    });
  }

  async unsave(slug: string): Promise<void> {
    const saved = this.user.saved.filter(s => s !== slug);
    await this.auth.updateUserDoc(this.user, {
      saved,
      isPro: this.user.isPro,
    });

    this.dialog.next({
      heading: 'Article remove form saved',
      type: 'info',
      basicButtonText: 'Ok',
    });
  } 
  
}
