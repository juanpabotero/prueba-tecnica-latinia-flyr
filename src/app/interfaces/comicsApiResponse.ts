export interface ComicsResponseApi {
 attributionHTML: string;
 attributionText: string;
 code:            number;
 copyright:       string;
 data:            Data;
 etag:            string;
 status:          string;
}

export interface Data {
 count:   number;
 limit:   number;
 offset:  number;
 results: Comic[];
 total:   number;
}

export interface Comic {
 characters:         Characters;
 collectedIssues:    Series[];
 collections:        any[];
 creators:           Creators;
 dates:              DateElement[];
 description:        null | string;
 diamondCode:        DiamondCode;
 digitalId:          number;
 ean:                string;
 events:             Characters;
 format:             Format;
 id:                 number;
 images:             Thumbnail[];
 isbn:               Isbn;
 issn:               string;
 issueNumber:        number;
 modified:           string;
 pageCount:          number;
 prices:             Price[];
 resourceURI:        string;
 series:             Series;
 stories:            Stories;
 textObjects:        TextObject[];
 thumbnail:          Thumbnail;
 title:              string;
 upc:                string;
 urls:               URL[];
 variantDescription: string;
 variants:           Series[];
}

export interface Characters {
 available:     number;
 collectionURI: string;
 items:         Series[];
 returned:      number;
}

export interface Series {
 name:        string;
 resourceURI: string;
}

export interface Creators {
 available:     number;
 collectionURI: string;
 items:         CreatorsItem[];
 returned:      number;
}

export interface CreatorsItem {
 name:        string;
 resourceURI: string;
 role:        Role;
}

export enum Role {
 Colorist = "colorist",
 Editor = "editor",
 Inker = "inker",
 Letterer = "letterer",
 Penciler = "penciler",
 Penciller = "penciller",
 PencillerCover = "penciller (cover)",
 Writer = "writer",
}

export interface DateElement {
 date: string;
 type: DateType;
}

export enum DateType {
 DigitalPurchaseDate = "digitalPurchaseDate",
 FocDate = "focDate",
 OnsaleDate = "onsaleDate",
 UnlimitedDate = "unlimitedDate",
}

export enum DiamondCode {
 Empty = "",
 Jul190068 = "JUL190068",
}

export enum Format {
 Comic = "Comic",
 Digest = "Digest",
 Empty = "",
 TradePaperback = "Trade Paperback",
}

export interface Thumbnail {
 extension: Extension;
 path:      string;
}

export enum Extension {
 Jpg = "jpg",
}

export enum Isbn {
 Empty = "",
 The0785111298 = "0-7851-1129-8",
 The0785114513 = "0-7851-1451-3",
 The0785115609 = "0-7851-1560-9",
}

export interface Price {
 price: number;
 type:  PriceType;
}

export enum PriceType {
 DigitalPurchasePrice = "digitalPurchasePrice",
 PrintPrice = "printPrice",
}

export interface Stories {
 available:     number;
 collectionURI: string;
 items:         StoriesItem[];
 returned:      number;
}

export interface StoriesItem {
 name:        string;
 resourceURI: string;
 type:        ItemType;
}

export enum ItemType {
 Cover = "cover",
 InteriorStory = "interiorStory",
 Promo = "promo",
}

export interface TextObject {
 language: Language;
 text:     string;
 type:     TextObjectType;
}

export enum Language {
 EnUs = "en-us",
}

export enum TextObjectType {
 IssueSolicitText = "issue_solicit_text",
}

export interface URL {
 type: URLType;
 url:  string;
}

export enum URLType {
 Detail = "detail",
 InAppLink = "inAppLink",
 Purchase = "purchase",
 Reader = "reader",
}
