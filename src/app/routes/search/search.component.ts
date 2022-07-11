import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable, switchMap, tap } from 'rxjs';
import { Article } from 'src/app/shared/types/article';
import { ArticleService } from '../articles/access/article.service';
import { ArticleListComponent } from '../articles/layouts/article-list/article-list.component';
import { LoaderComponent } from 'src/app/shared/layouts/loader/loader.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ArticleListComponent, LoaderComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  search: FormControl<string> = new FormControl('');

  articles$: Observable<Article[]> = this.search.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(search => this.articleService.matchByInput(search)),
    map(articles => this.search.value ? articles : null),
  );

  constructor(
    private articleService: ArticleService,
  ) { }

  ngOnInit(): void {
      
  }

}
