import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from '../article-list/article-list.component';
import { Article } from 'src/app/shared/types/article';

@Component({
  selector: 'app-latest-articles',
  standalone: true,
  imports: [CommonModule, ArticleListComponent],
  templateUrl: './latest-articles.component.html',
  styleUrls: ['./latest-articles.component.scss']
})
export class LatestArticlesComponent implements OnChanges {

  @Input() articles: Article[];
  @Input() count: number;

  constructor() { }

  ngOnChanges(): void {
    if (this.articles) {
      this.articles = this.articles.slice(0, this.count);
    }
  }
}
