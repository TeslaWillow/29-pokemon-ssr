import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let compiled: HTMLDivElement;

  @Component({
    selector: 'shared-navbar',
    standalone: true,
  })
  class NavbarComponentMock {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([])
      ]
    })
    .overrideComponent(AppComponent, {
      add: {
        imports: [ NavbarComponentMock ],
      },
      remove: {
        imports: [ NavbarComponent ],
      }
    }),
    //.compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLDivElement;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should render the shared-navbar and router-outlet`, () => {

    expect(compiled.querySelector('shared-navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();

  });
  /*

    it('should render title', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h1')?.textContent).toContain('Hello, pokemon-ssr');
    });
  */
});
