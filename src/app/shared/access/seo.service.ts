import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta,
    private title: Title, 
  ) {}

  setMetaTags(metaTags: MetaDefinition[]): void {
    this.meta.addTags(metaTags);
  }

  setTitle(title: string): void {
    this.title.setTitle(title);
  }

  get isServer(): boolean {
    return isPlatformServer(this.platformId);
  }

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

}
