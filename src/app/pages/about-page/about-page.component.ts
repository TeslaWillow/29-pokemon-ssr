import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  imports: [],
  templateUrl: './about-page.component.html',
})
export default class PricingPageComponent implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('About Page');
    this.meta.updateTag({
      name: 'Description',
      content: 'Este es mi About Page',
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'About Page',
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Curso, Angular, Pro',
    });
  }

}
