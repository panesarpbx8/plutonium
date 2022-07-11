import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/shared/access/auth.service';
import { SeoService } from 'src/app/shared/access/seo.service';
import { constants } from 'src/app/app.constants';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private seo: SeoService,
  ) { }

  ngOnInit(): void {
    this.seo.setTitle(constants.brand + ' - Profile');
  }

}
