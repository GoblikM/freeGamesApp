import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}


export interface MinimumSystemRequirements {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
};

export interface Screenshot {
  id: number;
  image: string;
};

export interface GameDetails {
  id: number;
  title: string;
  thumbnail: string;
  status: string;
  short_description: string;
  description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
  minimum_system_requirements: MinimumSystemRequirements;
  screenshots: Screenshot[];
};


@Injectable({
  providedIn: 'root'
})




export class GamesService {


  //injecting HttpClient
  constructor(private http: HttpClient) { }


  getGames(): Observable<Game>{
    const url = 'https://cors-anywhere.herokuapp.com/'+`${environment.baseUrl}/games`;
     return this.http.get<Game>(url);
  }

  getGameDetails(id: string):Observable<GameDetails>{
    const url = 'https://cors-anywhere.herokuapp.com/'+`${environment.baseUrl}/game?id=${id}`;
    return this.http.get<GameDetails>(url);

  }
}
