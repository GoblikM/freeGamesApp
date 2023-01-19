import { Preferences } from '@capacitor/preferences';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {

  games:any[] = []
  favouriteGames: any =[];

  constructor(private storageService: StorageService, private modalController: ModalController) {

   }

  ngOnInit() {
    this.initFavouriteGames();
  }

  async initFavouriteGames(){
    this.storageService.getData('favourites').then(res =>{
        this.favouriteGames = res;
    });
  }

  deleteFavourites(){
    this.storageService.deleteData();
    this.dismiss();

  }



  /**
   * Click event dismiss
   */
  async dismiss() {
    // dismiss modal
    await this.modalController.dismiss();

  }

}
