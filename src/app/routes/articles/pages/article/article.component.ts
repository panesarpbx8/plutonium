import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { constants } from 'src/app/app.constants';
import { SeoService } from 'src/app/shared/access/seo.service';
import { LoaderComponent } from 'src/app/shared/layouts/loader/loader.component';
import { Article, Toc } from 'src/app/shared/types/article';
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
    tap(article => this.seo.setMetaTags(this.generateTags(article))),
  );

  articles$ = this.articleService.findAll();

  tocs: Toc[];

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
  }

  setTocs(tocs: Toc[]) {
    this.tocs = tocs;
  }

  private generateTags(article: Article): MetaDefinition[] {
    return [
      { itemprop: 'datePublished', content: article.createdAt },
      { itemprop: 'image', content: article.coverUrl },
      { itemprop: 'publisher', content: constants.brand },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:creator', content: 'panesarpbx8' },
      { name: 'twitter:title', content: article.title },
      { name: 'twitter:description', content: article.headline },
      { name: 'twitter:image', content: article.coverUrl },
      { property: 'og:title', content: article.title },
      { property: 'og:description', content: article.headline },
      { property: 'og:image', content: article.coverUrl },
      { name: 'title', content: article.title },
      { name: 'author', content: article.author },
      { name: 'author-image', content: article.authorImage },
      { name: 'author-link', content: article.authorLink },
    ];
  }
  
}
