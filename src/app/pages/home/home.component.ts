import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs';
import { Character } from 'src/app/interfaces/charactersApiResponse';
import { MarvelService } from 'src/app/services/marvel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  characters: Character[] = [];
  hasError = false;
  isLoading = true;
  searchText = '';
  private searchText$ = new Subject<string>();

  constructor(
    private marvelService: MarvelService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // this,this.getCharactersMock();

    this.activatedRoute.queryParams
      .pipe(
        map((params) => {
          this.searchText = params['search'] || '';
          return params['search'];
        }),
        switchMap((searchText: string) =>
          this.marvelService.getCharacters(searchText)
        )
      )
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.hasError = false;
          this.characters = res.data.results;
          if (this.characters.length === 0) this.hasError = true;
        },
        error: () => {
          this.isLoading = false;
          this.hasError = true;
        },
      });

    this.searchText$
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchText: string) => {
        this.router.navigate(['/characters'], {
          queryParams: { search: searchText },
        });
      });
  }

  searchCharacter(event: Event) {
    const inputText = (event.target as HTMLInputElement).value
      .trim()
      .toLocaleLowerCase();
    this.searchText$.next(inputText);
  }

  // getCharacters(searchText: string = '') {
  //   this.marvelService.getCharacters(searchText).subscribe({
  //     next: (res) => {
  //       this.characters = res.data.results;
  //       if (this.characters.length === 0) this.hasError = true;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  // getCharactersMock() {
  //   this.marvelService.getCharactersMock().subscribe({
  //     next: (res) => {
  //       this.characters = res.data.results;
  //       this.isLoading = false;
  //       if (this.characters.length === 0) this.hasError = true;
  //     },
  //     error: () => {
  //       this.hasError = true;
  //     },
  //   });
  // }
}
