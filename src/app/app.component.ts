import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-base>  
      <router-outlet></router-outlet>
    </app-base>
  `,
})
export class AppComponent {}
