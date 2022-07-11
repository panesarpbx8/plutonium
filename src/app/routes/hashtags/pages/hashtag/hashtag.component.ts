import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HashtagListComponent } from '../../layouts/hashtag-list/hashtag-list.component';
import { ArticleListComponent } from 'src/app/routes/articles/layouts/article-list/article-list.component';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { Article } from 'src/app/shared/types/article';
import { ArticleService } from 'src/app/routes/articles/access/article.service';
import { HashtagHeadingComponent } from '../../layouts/hashtag-heading/hashtag-heading.component';

@Component({
  selector: 'app-hashtag',
  standalone: true,
  imports: [CommonModule, HashtagHeadingComponent, ArticleListComponent],
  templateUrl: './hashtag.component.html',
  styleUrls: ['./hashtag.component.scss']
})
export class HashtagComponent implements OnInit {

  hashtag$: Observable<string> = this.route.paramMap.pipe(
    map(params => params.get('hashtag')),
  );;

  articles$: Observable<Article[]> = this.hashtag$.pipe(
    switchMap(hashtag => this.articleService.findByHashtag(hashtag)),
  );

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

}
