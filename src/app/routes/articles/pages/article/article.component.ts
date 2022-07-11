import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { SeoService } from 'src/app/shared/access/seo.service';
import { LoaderComponent } from 'src/app/shared/layouts/loader/loader.component';
import { Toc } from 'src/app/shared/types/article';
import { ArticleService } from '../../access/article.service';
import { ArticleHeroComponent } from '../../layouts/article-hero/article-hero.component';
import { LatestArticlesComponent } from '../../layouts/latest-articles/latest-articles.component';
import { RenderArticleModule } from '../../layouts/render-article/render-article.module';
import { SaveButtonComponent } from '../../layouts/save-button/save-button.component';
import { SimilarArticlesComponent } from '../../layouts/similar-articles/similar-articles.component';
import { TocComponent } from '../../layouts/toc/toc.component';

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

  fetchServerArticle() {
    
  }

}
