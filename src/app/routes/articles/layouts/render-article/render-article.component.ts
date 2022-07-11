import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Toc } from 'src/app/shared/types/article';

@Component({
  selector: 'app-render-article',
  templateUrl: './render-article.component.html',
  styleUrls: ['./render-article.component.scss']
})
export class RenderArticleComponent implements OnInit {

  @Input() md: string;
  @Input() tocs: Toc[];
  @Input() slug: string;

  constructor(private el: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const markdownChildNodes = this.el.nativeElement.children.item(0).children.item(0).children;

    for (let i = 0; i < markdownChildNodes.length; i++) {
      if (markdownChildNodes[i].nodeName === 'H2') {
        const toc = this.tocs.find(t => t.text === markdownChildNodes[i].innerHTML);
        markdownChildNodes[i].id = toc.anchor;
      }
    }

    const imgNodes = this.el.nativeElement.getElementsByTagName('img');
    
    for (let i = 0; i < imgNodes.length; i++) {
      const oldSrc = imgNodes[i].src;
      const origin = window.location.origin;
      const imagePath = oldSrc.replace(origin, '');
      const newSrc = `${origin}/content/${this.slug}${imagePath}`;
      imgNodes[i].src = newSrc;
    }
  }

}
