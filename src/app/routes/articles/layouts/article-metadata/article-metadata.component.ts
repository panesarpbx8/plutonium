import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from 'src/app/shared/types/article';

@Component({
  selector: 'app-article-metadata',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-metadata.component.html',
  styleUrls: ['./article-metadata.component.scss']
})
export class ArticleMetadataComponent implements OnInit {

  @Input() article: Article;

  constructor() { }

  ngOnInit(): void {
  }

}
