import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedArticleComponent } from '../articles/layouts/featured-article/featured-article.component';
import { ArticleService } from '../articles/access/article.service';
import { LoaderComponent } from 'src/app/shared/layouts/loader/loader.component';
import { SeoService } from 'src/app/shared/access/seo.service';
import { constants } from 'src/app/app.constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FeaturedArticleComponent, LoaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  featuredArticle$ = this.articleService.findFeaturedArticle();

  constructor(
    private articleService: ArticleService,
    private seo: SeoService
  ) { }

  ngOnInit(): void {
    this.seo.setTitle(constants.brand + ' - Home');
  }

}
