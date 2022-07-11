import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { constants } from 'src/app/app.constants';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/shared/access/auth.service';
import { SeoService } from 'src/app/shared/access/seo.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constants = constants;
  user$ = this.auth.user$;

  constructor(
    private auth: AuthService,
    private seo: SeoService,
  ) {    
    if (this.seo.isBrowser) {
      document.onscroll = () => {
        document.querySelector('header')
          .classList.toggle('scrolled', document.scrollingElement.scrollTop > document.querySelector('header').offsetHeight)      
      }
    }
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.logout();
  }

}

