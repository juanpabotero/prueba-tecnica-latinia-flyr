import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { CharactersApiResponse } from '../interfaces/charactersApiResponse';
import { Comic, ComicsResponseApi } from '../interfaces/comicsApiResponse';

@Injectable({
  providedIn: 'root',
})
export class MarvelService {
  private baseUrl = environment.baseUrl;
  private apiKey = environment.apiKey;
  private hash = environment.hash;
  private ts = environment.ts;
  private query = `ts=${this.ts}&apikey=${this.apiKey}&hash=${this.hash}`;

  constructor(private http: HttpClient) {}

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

  getComicsRelatedToCharacter(comics: any): Observable<Comic[]> {
    const comicsRequests: any[] = [];
    for (const comic of comics) {
      const urlComic = comic.resourceURI.replace('http', 'https');
      comicsRequests.push(this.getComicsById(urlComic));
    }
    return forkJoin(comicsRequests).pipe(
      map((res) => {
        return res.map((comic) => comic.data.results[0]);
      })
    );
  }
}
