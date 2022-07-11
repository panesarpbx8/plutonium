import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { constants } from 'src/app/app.constants';
import { SeoService } from 'src/app/shared/access/seo.service';
import { LoaderComponent } from 'src/app/shared/layouts/loader/loader.component';
import { ArticleService } from '../../access/article.service';
import { ArticleListComponent } from '../../layouts/article-list/article-list.component';
import { FeaturedArticleComponent } from '../../layouts/featured-article/featured-article.component';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, ArticleListComponent, FeaturedArticleComponent, LoaderComponent],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  featuredArticle$ = this.articleService.findFeaturedArticle();
  articles$ = this.articleService.findAll();

  constructor(
    private articleService: ArticleService,
    private seo: SeoService,
  ) { }

  ngOnInit(): void {
    this.seo.setTitle(constants.brand + ' - Articles');
  }

}
