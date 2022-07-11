import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hashtag-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hashtag-list.component.html',
  styleUrls: ['./hashtag-list.component.scss']
})
export class HashtagListComponent implements OnInit {

  @Input() hashtags: string[];
  @Input() heading: string;

  constructor() { }

  ngOnInit(): void {
  }

}
