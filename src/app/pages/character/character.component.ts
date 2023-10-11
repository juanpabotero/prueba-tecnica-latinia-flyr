import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Character } from 'src/app/interfaces/charactersApiResponse';
import { Comic } from 'src/app/interfaces/comicsApiResponse';
import { MarvelService } from 'src/app/services/marvel.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.sass'],
})
export class CharacterComponent implements OnInit {
  character!: Character;
  comics: Comic[] = [];
  filteredComics: Comic[] = [];
  hasComics = this.filteredComics.length > 0;
  isLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private marvelService: MarvelService
  ) {}

  ngOnInit() {
    this.activatedRoute.params
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

    // this.marvelService.getCharactersMock().subscribe((res) => {
    //   this.character = res.data.results[1];
    //   for (const comic of this.character.comics.items) {
    //     this.marvelService.getComicsById(comic.resourceURI).subscribe((res) => {
    //       this.comics.push(res.data.results[0]);
    //       if (this.comics.length > 0) {
    //         this.comics.sort((a, b) => {
    //           // sort by date
    //           if (a.dates[0].date < b.dates[0].date) {
    //             return 1;
    //           } else {
    //             return -1;
    //           }
    //         });
    //       }
    //     });
    //   }
    // });

    // this.marvelService.getCharactersMock().subscribe((res) => {
    //   this.character = res.data.results[1];
    //   this.isLoading = false;
    // });

    // this.marvelService.getComicsMock().subscribe((res) => {
    //   this.comics = res.data.results;
    //   this.filteredComics = res.data.results;
    //   this.hasComics = this.filteredComics.length > 0;
    // });
  }

  sortArrayByDate(array: any[]) {
    array.sort((a, b) => {
      // sort by date
      if (a.dates[0].date < b.dates[0].date) {
        return 1;
      } else {
        return -1;
      }
    });
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
}
