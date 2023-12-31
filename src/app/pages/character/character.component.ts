import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Character } from 'src/app/interfaces/charactersApiResponse';
import { Comic } from 'src/app/interfaces/comicsApiResponse';
import { MarvelService } from 'src/app/services/marvel.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.sass'],
})
export class CharacterComponent implements OnInit, OnDestroy {
  character!: Character;
  comics: Comic[] = [];
  dataSuscription: Subscription | undefined;
  filteredComics: Comic[] = [];
  hasComics = this.filteredComics.length > 0;
  isLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private marvelService: MarvelService
  ) {}

  ngOnInit(): void {
    this.dataSuscription = this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.marvelService.getCharacterById(id)))
      .subscribe({
        next: (character) => {
          this.isLoading = false;
          this.character = character.data.results[0];
          this.marvelService
            .getComicsRelatedToCharacter(this.character.comics.items)
            .subscribe({
              next: (res) => {
                this.comics = res;
                if (this.comics.length > 1) {
                  this.sortArrayByDate(this.comics);
                }
                this.filteredComics = this.comics;
                this.hasComics = this.filteredComics.length > 0;
              },
              error: () => {
                this.hasComics = false;
              },
            });
        },
      });
  }

  ngOnDestroy(): void {
    this.dataSuscription?.unsubscribe();
  }

  filterComics(format: string) {
    if (format === 'Todos' || format === '') {
      this.filteredComics = this.comics;
    } else {
      this.filteredComics = this.comics.filter(
        (comic) => comic.format === format
      );
    }
    this.hasComics = this.filteredComics.length > 0;
  }

  sortArrayByDate(array: any[]) {
    array.sort((a, b) => {
      return a.dates[0].date < b.dates[0].date ? 1 : -1;
    });
  }
}
