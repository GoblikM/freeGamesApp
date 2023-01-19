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
  async initGames(){

    //setup loading circle
    const loading = await this.loadingController.create({
      message: 'Loading games...',
      duration:4000,
      spinner: 'crescent',
      backdropDismiss:false,

    })
    await loading.present();

    this.gamesService.getGames().subscribe(res =>{
      this.games.push(res);
      loading.dismiss();
    });
  }

  async addToFavorites(game : any){
    let stored = this.favourites.some(item => item.id === game.id);
    if(!stored){
      this.favourites.push(game);
      this.storageService.saveData('favourites', this.favourites);
       const alert = await this.alertController.create({
         header: 'Success',
         subHeader: 'Game added to favourites',
         buttons: ['OK'],
       });
       await alert.present();
    }
    else{
      const alert = await this.alertController.create({
        header: 'Warning',
        subHeader: 'Game already added to favourites!',
        buttons: ['OK'],
      });
      await alert.present();
    }
    console.log(this.storageService.getData('favorites'));

}
}

