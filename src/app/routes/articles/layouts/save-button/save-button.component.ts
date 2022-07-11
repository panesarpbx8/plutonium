import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveService } from '../../access/save.service';
import { AuthService } from 'src/app/shared/access/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/types/user';

@Component({
  selector: 'app-save-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.scss']
})
export class SaveButtonComponent {

  @Input() slug: string;
  
  user$: Observable<User> = this.auth.user$;
 
  constructor(
    private saveService: SaveService,
    private auth: AuthService,
  ) {}

  async unsave(slug: string) {
    await this.saveService.unsave(slug);
  }

  async save(slug: string) {
    await this.saveService.save(slug);
  }

}
