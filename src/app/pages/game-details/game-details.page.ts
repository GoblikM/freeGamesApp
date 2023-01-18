import { GamesService, GameDetails } from './../../services/games.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.page.html',
  styleUrls: ['./game-details.page.scss'],
})
export class GameDetailsPage implements OnInit {
  game:any = null;

  constructor(private route: ActivatedRoute, private gamesService: GamesService) { }

  slideOptions={
    loop: true,
    autoplay: 2000,
    pager:true,

  };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.gamesService.getGameDetails(id).subscribe(res =>{
      console.log(res);
      this.game = res;
    });
  }

  openHomepage(){
    window.open(this.game.game_url);
  }


}
