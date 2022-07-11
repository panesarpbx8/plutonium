import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from 'src/app/shared/types/article';
import { HashtagListComponent } from 'src/app/routes/hashtags/layouts/hashtag-list/hashtag-list.component';

@Component({
  selector: 'app-article-hero',
  standalone: true,
  imports: [CommonModule, HashtagListComponent],
  templateUrl: './article-hero.component.html',
  styleUrls: ['./article-hero.component.scss']
})
export class ArticleHeroComponent implements OnInit {

  @Input() article: Article;

  constructor() { }

  ngOnInit(): void {
  }

}
