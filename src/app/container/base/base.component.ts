import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { FooterComponent } from '../footer/footer.component';
import { DialogComponent } from 'src/app/shared/layouts/dialog/dialog.component';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [CommonModule, NavComponent, FooterComponent, DialogComponent],
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
