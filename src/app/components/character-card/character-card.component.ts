import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from 'src/app/interfaces/charactersApiResponse';
import { Comic } from 'src/app/interfaces/comicsApiResponse';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.sass'],
})
export class CharacterCardComponent {
  @Input() character!: Character;
  @Input() filteredComics: Comic[] = [];
  @Input() hasComics: boolean = true;
  @Input() showDetails!: boolean;
  @Output() filterComicsEvent: EventEmitter<string> = new EventEmitter();
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

  filterComics(event: any) {
    const format = event.value;
    this.filterComicsEvent.emit(format);
  }
}
