import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { Article } from 'src/app/shared/types/article';
import { ArticleListComponent } from '../article-list/article-list.component';

@Component({
  selector: 'app-similar-articles',
  standalone: true,
  imports: [CommonModule, ArticleListComponent],
  templateUrl: './similar-articles.component.html',
  styleUrls: ['./similar-articles.component.scss']
})
export class SimilarArticlesComponent implements OnChanges {

  @Input() currentArticleTitle!: string;
  @Input() allArticles: Article[];
  @Input() hashtags: string[];
  @Input() count: number;

  similarArticles: Article[];

  constructor() { }

  ngOnChanges(): void {
    if (this.allArticles) {
      this.similarArticles = this.allArticles
        .filter(article => {
          if (article.title !== this.currentArticleTitle) { 
            for (const hashtag of this.hashtags) {
              return article.hashtags.includes(hashtag);
            }
          } 
          return false;
        })
        .slice(0, this.count);
    }
  }

}
