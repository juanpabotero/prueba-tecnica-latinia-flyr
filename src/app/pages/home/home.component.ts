import { Component } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Character } from 'src/app/interfaces/charactersApiResponse';
import { MarvelService } from 'src/app/services/marvel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  characters: Character[] = [];
  error = false;
  private searchText$ = new Subject<string>();

  constructor(private marvelService: MarvelService) {}

  ngOnInit() {
    this.getCharactersMock();
    // this.searchText$
    //   .pipe(
    //     debounceTime(500),
    //     distinctUntilChanged(),
    //     switchMap((inputText: any) =>
    //       this.marvelService.getCharacters(inputText)
    //     )
    //   )
    //   .subscribe({
    //     next: (res: any) => {
    //       this.error = false;
    //       this.characters = res.data.results;
    //       if (this.characters.length === 0) this.error = true;
    //     },
    //     error: (err: any) => {
    //       console.log(err);
    //     },
    //   });
  }

  getCharacters() {
    this.marvelService.getCharacters('').subscribe({
      next: (res) => {
        this.characters = res.data.results;
        if (this.characters.length === 0) this.error = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getCharactersMock() {
    this.marvelService.getCharactersMock().subscribe({
      next: (res) => {
        this.characters = res.data.results;
        if (this.characters.length === 0) this.error = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  searchCharacter(event: Event) {
    const inputText = (event.target as HTMLInputElement).value;
    this.searchText$.next(inputText);
  }
}
