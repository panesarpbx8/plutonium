import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, zip } from 'rxjs';
import { Article } from 'src/app/shared/types/article';
import frontmatter from 'front-matter';
import { constants } from 'src/app/app.constants';

@Injectable({ providedIn: 'root' })
export class ArticleService {

  constructor(private http: HttpClient) {}

  findAll(): Observable<Article[]> {
    const slugs = constants.articles.slugs;
    const articles$arr = slugs.map(slug => this.findBySlug(slug));

    return zip(articles$arr)
      .pipe(map(articles => this.sortArticlesByDate(articles)));;
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
    const { attributes, body } = frontmatter(md);
    const fields = attributes as any;

    return {
      title: fields.title,
      headline: fields.headline,
      hashtags: fields.hashtags,
      createdAt: fields.createdAt,
      source: fields.source,
      author: fields.author,
      authorImage: fields.authorImage,
      authorLink: fields.authorLink,
      body,
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
