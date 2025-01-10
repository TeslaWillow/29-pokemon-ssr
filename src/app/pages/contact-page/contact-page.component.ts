import { Component, inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'contact-page',
  imports: [],
  templateUrl: './contact-page.component.html',
})
export default class ContactPageComponent implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Contact Page');
    this.meta.updateTag({
      name: 'Description',
      content: 'Este es mi Contact Page',
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Contact Page',
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Curso, Angular, Pro',
    });
  }

}
