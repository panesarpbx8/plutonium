import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ArticleService } from '../../articles/access/article.service';

@Injectable({ providedIn: 'root' })
export class HashtagService {

  constructor(private articleService: ArticleService) { }

  findAll(): Observable<string[]> {
    return this.articleService.findAll().pipe(
      map(articles => {
        const hashtags = new Set<string>();

        for (const article of articles) {
          for (const hashtag of article.hashtags) {
            hashtags.add(hashtag);
          }
        }
        return Array.from(hashtags).sort();
      }),
    );
  }

}
