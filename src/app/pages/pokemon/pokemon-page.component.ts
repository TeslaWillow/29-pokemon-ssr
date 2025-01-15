import { Component, OnInit } from '@angular/core';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';


@Component({
  selector: 'app-pokemon-page',
  imports: [ PokemonListComponent ],
  templateUrl: './pokemon-page.component.html',
  styles: ``
})
export default class PokemonPageComponent implements OnInit {

  // public isLoading = signal<boolean>(true);

  // private appRef = inject(ApplicationRef);
  // private $appState = this.appRef.isStable.subscribe( isStable => {
  //   console.log({ isStable });
  // });

  constructor(){}

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 1000);
  }

  // ngOnDestroy(): void {
  //   this.$appState.unsubscribe();
  // }

}
