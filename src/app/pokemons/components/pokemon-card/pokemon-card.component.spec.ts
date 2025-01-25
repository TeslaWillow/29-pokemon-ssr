
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PokemonCardComponent } from "./pokemon-card.component";
import { provideRouter } from "@angular/router";
import { SimplePokemon } from "../../interfaces";

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'bulbasaur',
};

describe('Pokemon card component', () => {

  let fixture: ComponentFixture<PokemonCardComponent>;
  let component: PokemonCardComponent;
  let compiled: HTMLDivElement;

  beforeEach(async()=>{
    await TestBed.configureTestingModule({
      imports: [ PokemonCardComponent ],
      providers: [  provideRouter([]) ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    fixture.componentRef.setInput('pokemon', mockPokemon);

    compiled = fixture.nativeElement as HTMLDivElement;
    component = fixture.componentInstance;

    fixture.detectChanges(); // Detect the input
  });

  it('should be created', () => {
    console.log(compiled);
    expect(component).toBeTruthy();
  });

  it('should have the SimplePokemon signal inputValue', () => {
    expect(component.pokemon()).toEqual(mockPokemon);
  });

  it('should render the pokemon name and image correctly', () => {
    const img = compiled.querySelector('img');
    expect(img).toBeDefined();

    expect(img?.src).toBe(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`);

    const pokemonName = compiled.querySelector('h2');
    expect(pokemonName?.textContent?.trim()).toBe('bulbasaur');
  });

  it('should have the proper ng-reflect-router-link', () => {
    const routerLink = compiled.querySelector('.cursor-pointer');
    expect(routerLink?.getAttribute('ng-reflect-router-link')).toBeTruthy();

    expect(
      routerLink?.attributes.getNamedItem('ng-reflect-router-link')?.value
    ).toBe(`/pokemon,${mockPokemon.name}`);

  });

});


