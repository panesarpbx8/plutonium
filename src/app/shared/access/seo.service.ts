import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private title: Title, 
    private meta: Meta,
  ) {}

  setTitle(title: string) {
    this.title.setTitle(title);
  }

  get isServer(): boolean {
    return isPlatformServer(this.platformId);
  }

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

}
