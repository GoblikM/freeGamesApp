import { Observable } from 'rxjs';
import { Game, GamesService } from './../../services/games.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {

  games: any[]=[];

  //injecting gamesService
  constructor(private gamesService: GamesService, private loadingCtlr: LoadingController) { }

  ngOnInit() {
    this.initGames();
  }

  async initGames(){

    const loading = await this.loadingCtlr.create({
      message: 'Loading games...',
      spinner: 'crescent',
      backdropDismiss:false,
      translucent:true

    })
    await loading.present();

    this.gamesService.getGames().subscribe(res =>{
      loading.dismiss();
      this.games.push(res);
    });
  }

}
