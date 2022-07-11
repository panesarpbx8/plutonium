import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from 'src/app/shared/types/article';
import { ArticleMetadataComponent } from '../article-metadata/article-metadata.component';
import { HashtagListComponent } from 'src/app/routes/hashtags/layouts/hashtag-list/hashtag-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-featured-article',
  standalone: true,
  imports: [CommonModule, RouterModule, ArticleMetadataComponent, HashtagListComponent],
  templateUrl: './featured-article.component.html',
  styleUrls: ['./featured-article.component.scss']
})
export class FeaturedArticleComponent implements OnInit {

  @Input() article: Article; 

  constructor() { }

  ngOnInit(): void {
  }

}
