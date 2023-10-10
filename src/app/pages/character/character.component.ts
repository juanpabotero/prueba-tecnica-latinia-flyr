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
  formats: string[] = [
    'Todos',
    'Comic',
    'Magazine',
    'Trade Paperback',
    'Hardcover',
    'Digest',
    'Graphic Novel',
    'Digital Comic',
    'Infinite Comic',
  ];
  hasComics = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private marvelService: MarvelService
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.marvelService.getCharacterById(id)))
      .subscribe((character) => {
        this.character = character.data.results[0];
        for (const comic of this.character.comics.items) {
          this.marvelService
            .getComicsById(comic.resourceURI)
            .subscribe((res) => {
              this.comics.push(res.data.results[0]);
              if (this.comics.length > 1) {
                this.comics.sort((a, b) => {
                  // sort by date
                  if (a.dates[0].date < b.dates[0].date) {
                    return 1;
                  } else {
                    return -1;
                  }
                });
                this.filteredComics = this.comics;
              }
            });
        }
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
    // });

    // this.marvelService.getComicsMock().subscribe((res) => {
    //   this.comics = res.data.results;
    //   this.filteredComics = res.data.results;
    // });
  }

  filterComics(event: any) {
    const format = event.value;
    this.hasComics = true;
    if (format === 'Todos' || format === '') {
      this.filteredComics = this.comics;
    } else {
      this.filteredComics = this.comics.filter(
        (comic) => comic.format === format
      );
    }
    if (this.filteredComics.length === 0) {
      this.hasComics = false;
    }
  }
}
