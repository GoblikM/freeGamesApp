import { FavouritesPage } from './../favourites/favourites.page';
import { Observable } from 'rxjs';
import { Game, GamesService } from './../../services/games.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {

  games: any[] = [];
  favourites: any[] = [];

  //injecting gamesService, LoadingCotroller, AlertController
  constructor(
    private gamesService: GamesService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private storageService: StorageService,
    private modalController: ModalController
    )
    { }

  ngOnInit() {
    this.initGames();
  }

  genreSelect(event:any){
    console.log(event.detail.value);
    let genre = event.detail.value;
    this.games = [];
    this.initGames(genre);

  }

   /**
   * Click event
   */
   openFavourites() {
    this.openModal();
  }

  /**
   * Open Ionic modal
   */
  async openModal() {
    const modal = await this.modalController.create({
      component: FavouritesPage,
    });
    modal.present();
  }

  /**
   * Initializing all games
   */
  async initGames(genre?:string){

    //setup loading circle
    const loading = await this.loadingController.create({
      message: 'Loading games...',
      duration:4000,
      spinner: 'crescent',
      backdropDismiss:false,

    })
    await loading.present();

    this.gamesService.getGames(genre).subscribe(res =>{
      this.games.push(res);

    });
  }

  async addToFavorites(game : any){
    let stored;
    await this.storageService.getData('favourites').then(res=>{
      this.favourites = res;
    })
    if(this.favourites == undefined){
      this.favourites = [];
    }
    stored = this.favourites.some(item => item.id === game.id);
    if(!stored){
      this.favourites.push(game);
      this.storageService.saveData('favourites', this.favourites);
       const alert = await this.alertController.create({
         header: 'Success',
         backdropDismiss: true,
         subHeader: 'Game added to favourites',
         buttons: ['OK'],
       });
       await alert.present();
       this.favourites=[];
    }
    else{
      const alert = await this.alertController.create({
        header: 'Warning',
        subHeader: 'Game already in favourites!',
        backdropDismiss: true,
        buttons: ['OK'],
      });
      await alert.present();
    }
    console.log(this.storageService.getData('favorites'));

}
}

