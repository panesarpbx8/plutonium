import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from 'src/app/shared/types/article';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  @Input() articles: Article[];

  constructor() { }

  ngOnInit(): void {
  }

}
