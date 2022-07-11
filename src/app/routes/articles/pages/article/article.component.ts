import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderArticleModule } from '../../layouts/render-article/render-article.module';
import { ArticleService } from '../../access/article.service';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';
import { Article, Toc } from 'src/app/shared/types/article';
import { ArticleHeroComponent } from '../../layouts/article-hero/article-hero.component';
import { TocComponent } from '../../layouts/toc/toc.component';
import { LatestArticlesComponent } from '../../layouts/latest-articles/latest-articles.component';
import { SimilarArticlesComponent } from '../../layouts/similar-articles/similar-articles.component';
import { SaveButtonComponent } from '../../layouts/save-button/save-button.component';
import { LoaderComponent } from 'src/app/shared/layouts/loader/loader.component';
import { SeoService } from 'src/app/shared/access/seo.service';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    CommonModule,
    RenderArticleModule,
    ArticleHeroComponent,
    LatestArticlesComponent,
    SimilarArticlesComponent,
    TocComponent,
    SaveButtonComponent,
    LoaderComponent,
  ],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  article$ = this.route.paramMap.pipe(
    map(params => params.get('slug')),
    switchMap(slug => this.articleService.findBySlug(slug)),
    tap(article => this.seo.setTitle(article.title)),
  );

  articles$ = this.articleService.findAll();

  tocs: Toc[];

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private seo: SeoService,
  ) { }

  ngOnInit(): void {
  }

  setTocs(tocs: Toc[]) {
    this.tocs = tocs;
  }

}
