import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CharactersApiResponse } from '../interfaces/charactersApiResponse';
import * as charactersData from '../mocks/characters.json';
import * as comicsData from '../mocks/comics.json';
import { ComicsResponseApi } from '../interfaces/comicsApiResponse';

@Injectable({
  providedIn: 'root',
})
export class MarvelService {
  private baseUrl = 'http://gateway.marvel.com/v1/public';
  private apiKey = 'e2ad79929a42e78613383753917f0476';
  private hash = '0a8d5bef2a76da6f44bd8937dd08ca75';
  private ts = '1000';
  private query = `ts=${this.ts}&apikey=${this.apiKey}&hash=${this.hash}`;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.getCharacters('');
    // this.getCharactersMock();
  }

  getCharactersMock(): Observable<CharactersApiResponse> {
    return of(<CharactersApiResponse>charactersData);
  }

  getComicsMock(): Observable<ComicsResponseApi> {
    return of(<ComicsResponseApi>comicsData);
  }

  getCharacters(searchText: string): Observable<CharactersApiResponse> {
    if (searchText) {
      return this.http.get<CharactersApiResponse>(
        `${this.baseUrl}/characters?nameStartsWith=${searchText}&${this.query}`
      );
    }
    return this.http.get<CharactersApiResponse>(
      `${this.baseUrl}/characters?${this.query}`
    );
  }

  getCharacterById(id: string): Observable<CharactersApiResponse> {
    return this.http.get<CharactersApiResponse>(
      `${this.baseUrl}/characters/${id}?${this.query}`
    );
  }

  getComicsById(url: string): Observable<ComicsResponseApi> {
    return this.http.get<ComicsResponseApi>(`${url}?${this.query}`);
  }
}
