import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Toc } from 'src/app/shared/types/article';

@Component({
  selector: 'app-toc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toc.component.html',
  styleUrls: ['./toc.component.scss']
})
export class TocComponent implements OnChanges {

  @Input() md: string;
  @Output() tocsEvent = new EventEmitter<Toc[]>();

  tocs: Toc[];

  constructor(private vps: ViewportScroller) { }

  ngOnChanges(): void {
    const tocs: Toc[] = [];

    for (const line of this.md.split('\n')) {
      if (line.startsWith('#')) {
        const anchor = line.replace('\r', '')
          .replace('## ', '')
          .split(' ')
          .join('-')
          .split('.')
          .join('-')
          .toLowerCase();
        
        const text = line.replace('\r', '')
          .replace('## ', '');
        
        tocs.push({ anchor, text });
      }
    }

    this.tocs = tocs;
    this.tocsEvent.emit(this.tocs);
  }

  scroll(anchor: string): void {
    this.vps.scrollToAnchor(anchor);
  }

}
