import { TestBed } from "@angular/core/testing";
import { provideRouter, Router } from "@angular/router";
import { routes } from "./app.routes";
import { Location } from "@angular/common";

describe('App Routes', () => {

  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes)
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should navigate to "About", redirects to /about', async() => {
    await router.navigate(['/about']);

    expect(location.path()).toBe('/about');
  });

  it('should navigate to "pokemons/page/1" redirect to "pokemons/page/1"', async() => {
    await router.navigate(['/pokemons/page/1']);

    expect(location.path()).toBe('/pokemons/page/1');
  });

  it('should navigate to "/about" if route is unknow', async() => {
    await router.navigate(['unknow-page']);

    expect(location.path()).toBe('/about');
  });

  it('should load the proper component', async() => {
    const aboutRoute = routes.find( (route) => route.path === 'about')!;
    expect(aboutRoute).toBeDefined();

    const aboutPageComponent = await aboutRoute.loadComponent!();

    expect((aboutPageComponent as any).default.name).toBe('AboutPageComponent');


    const pokemonRoute = routes.find( (route) => route.path === 'pokemons/page/:page')!;
    expect(pokemonRoute).toBeDefined();
    const pokemonPageComponent = await pokemonRoute.loadComponent!();

    expect((pokemonPageComponent as any).default.name).toBe('PokemonPageComponent');

  });

});
