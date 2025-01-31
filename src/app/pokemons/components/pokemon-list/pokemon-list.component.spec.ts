
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PokemonListComponent } from "./pokemon-list.component";
import { SimplePokemon } from "../../interfaces";
import { provideRouter } from "@angular/router";

const mockPokemons: SimplePokemon[] = [
  {
    id: '1',
    name: 'bulbasaur',
  },
  {
    id: '2',
    name: 'ivysaur',
  },
  {
    id: '3',
    name: 'venusaur',
  },
];

describe('PokemonListComponent', () => {

  let fixture: ComponentFixture<PokemonListComponent>;
  let component: PokemonListComponent;
  let compiled: HTMLDivElement;

  beforeEach(async()=>{
    await TestBed.configureTestingModule({
          imports: [ PokemonListComponent ],
          providers: [  provideRouter([]) ],
        }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);

    compiled = fixture.nativeElement as HTMLDivElement;
    component = fixture.componentInstance;

  });

  it('should be created', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges(); // Detect the input

    expect(component).toBeTruthy();
  });

  it('should render "No hay pokemons"', () => {
    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.detectChanges(); // Detect the input

    expect( compiled.querySelectorAll('pokemon-card').length ).toBe( mockPokemons.length );
  });


  it('should render pokemon cards', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges(); // Detect the input

    expect( compiled.querySelectorAll('pokemon-card').length ).toBe( 0 );
    expect( compiled.querySelector('div')?.textContent ).toContain('No hay pokemons');
  });

});


