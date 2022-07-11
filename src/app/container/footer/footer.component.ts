import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { constants } from 'src/app/app.constants';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constants = constants;

  constructor() { }

  ngOnInit(): void {
  }

}
