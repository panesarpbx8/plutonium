import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HashtagListComponent } from '../hashtag-list/hashtag-list.component';

@Component({
  selector: 'app-hashtag-heading',
  standalone: true,
  imports: [CommonModule, HashtagListComponent],
  templateUrl: './hashtag-heading.component.html',
  styleUrls: ['./hashtag-heading.component.scss']
})
export class HashtagHeadingComponent implements OnInit {

  @Input() hashtag: string;

  constructor() { }

  ngOnInit(): void {
  }

}
