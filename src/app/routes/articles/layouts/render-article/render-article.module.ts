import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderArticleComponent } from './render-article.component';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [RenderArticleComponent],
  imports: [
    CommonModule,
    MarkdownModule.forRoot(),
  ],
  exports: [RenderArticleComponent],
})
export class RenderArticleModule { }
