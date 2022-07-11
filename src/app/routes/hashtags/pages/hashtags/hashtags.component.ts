import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HashtagListComponent } from '../../layouts/hashtag-list/hashtag-list.component';
import { HashtagService } from '../../access/hashtag.service';

@Component({
  selector: 'app-hashtags',
  standalone: true,
  imports: [CommonModule, HashtagListComponent],
  templateUrl: './hashtags.component.html',
  styleUrls: ['./hashtags.component.scss']
})
export class HashtagsComponent implements OnInit {

  hashtags$ = this.hashtagService.findAll();

  constructor(private hashtagService: HashtagService) { }

  ngOnInit(): void {
  }

}
