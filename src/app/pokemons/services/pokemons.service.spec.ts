
import { TestBed } from "@angular/core/testing";
import { PokemonsService } from "./pokemons.service";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { SimplePokemon } from "../interfaces";

const expectedPokemons: SimplePokemon[] = [
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

const mockPokemon = {
  id: '1',
  name: 'bulbasaur',
};

describe('PokemonsService', () => {

  let service: PokemonsService;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(PokemonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});


