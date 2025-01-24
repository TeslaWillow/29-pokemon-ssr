import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  imports: [],
  templateUrl: './pricing-page.component.html',
})
export default class PricingPageComponent implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);
  // private platform = inject(PLATFORM_ID);

  ngOnInit(): void {

    // document.title = 'Pricing Page';

    // if( isPlatformBrowser(this.platform) ) {
    //   document.title = 'Pricing Page';
    // }

    this.title.setTitle('Pricing Page');
    this.meta.updateTag({
      name: 'Description',
      content: 'Este es mi Pricing Page',
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Pricing Page',
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Curso, Angular, Pro',
    });
  }

}
