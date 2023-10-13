import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  takeUntil,
} from 'rxjs';
import { Character } from 'src/app/interfaces/charactersApiResponse';
import { MarvelService } from 'src/app/services/marvel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit, OnDestroy {
  characters: Character[] = [];
  hasError = false;
  isLoading = true;
  searchText = '';
  unsubscribe$ = new Subject<void>();
  private searchText$ = new Subject<string>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private marvelService: MarvelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        map((params) => {
          this.searchText = params['search'] || '';
          return params['search'];
        }),
        switchMap((searchText: string) =>
          this.marvelService.getCharacters(searchText)
        ),
        takeUntil(this.unsubscribe$)
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
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((searchText: string) => {
        this.router.navigate(['/characters'], {
          queryParams: { search: searchText },
        });
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  searchCharacter(event: Event) {
    const inputText = (event.target as HTMLInputElement).value
      .trim()
      .toLocaleLowerCase();
    this.searchText$.next(inputText);
  }

  trackByFn(index: number, character: Character) {
    return character.id;
  }
}
