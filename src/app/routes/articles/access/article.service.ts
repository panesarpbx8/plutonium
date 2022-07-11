import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import * as graymatter from 'gray-matter';
import frontmatter from 'front-matter';
import { map, Observable, zip } from 'rxjs';
import { constants } from 'src/app/app.constants';
import { Article } from 'src/app/shared/types/article';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ArticleService {

  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
    private http: HttpClient
  ) {}

  findAll(): Observable<Article[]> {
    const slugs = constants.articles.slugs;
    const articles$arr = slugs.map(slug => this.findBySlug(slug));

    return zip(articles$arr).pipe(
      map(articles => this.sortArticlesByDate(articles))
    );
  }
  
  findBySlug(slug: string): Observable<Article> {
    return this.http
      .get(`/content/${slug}/index.md`, { responseType: 'text' })
      .pipe(map(md => this.processRawArticle(md, slug)));
  }

  findByHashtag(hashtag: string): Observable<Article[]> {
    return this.findAll().pipe(
      map(articles => articles.filter(article => article.hashtags.includes(hashtag))),
    );
  }

  findFeaturedArticle(): Observable<Article> {
    return this.findBySlug(constants.articles.featuredArticleSlug);
  }

  getCoverUrl(slug: string): string {
    return `/content/${slug}/img/cover.png`;
  }

  matchByInput(input: string): Observable<Article[]> {
    return this.findAll().pipe(
      map(articles => {
        return articles.filter(article => {
          return article.title.toLowerCase().includes(input.toLowerCase()) || 
            article.headline.toLowerCase().includes(input.toLowerCase());
        });
      }),
    );
  }

  private processRawArticle(md: string, slug: string): Article {
    let content: string, fields: any;

    if (isPlatformBrowser(this.platform)) {
      let front = frontmatter(md);
      content = front.body;
      fields = front.attributes;
    } else {
      let gray = graymatter(md);
      content = gray.content;
      fields = gray.data;
    }

    return {
      title: fields.title,
      headline: fields.headline,
      hashtags: fields.hashtags,
      createdAt: fields.createdAt,
      source: fields.source,
      author: fields.author,
      authorImage: fields.authorImage,
      authorLink: fields.authorLink,
      body: content,
      slug,
      coverUrl: this.getCoverUrl(slug),
    };
  }
  
  private sortArticlesByDate(articles: Article[]): Article[] {
    return articles.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }
  
}
