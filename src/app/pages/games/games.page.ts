import { FavouritesPage } from './../favourites/favourites.page';
import { Observable } from 'rxjs';
import { Game, GamesService } from './../../services/games.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent, LoadingController, ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {

  @ViewChild(IonContent, { static: false })
  content!: IonContent;
  //all games arr
  games: any[] = [];
  favourites: any[] = [];
  //games to display
  displayedGames: any[] =[];
  //limit for loding games
  limit = 10;
  searching:boolean = false;

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
   * handling search bar
   * @param event
   * @returns
   */
  async search(event:any){
    console.log(event.target.value);
    this.searching = true;
    let searchTerm = event.target.value;
    if (searchTerm.trim() === '') {
      this.displayedGames[0] = this.games[0].slice(0, this.limit);;
      return;
    }
    this.displayedGames = [];
     this.displayedGames[0] = this.games[0].filter((game:any) => game.title.toLowerCase().includes(searchTerm.toLowerCase()))
     console.log(this.displayedGames);
  }


  /**
   * Getting value from ion-select tag
   * @param event ionChange event after selectin genre
   */
  genreSelect(event:any){
    console.log(event.detail.value);
    let genre = event.detail.value;
    this.games = [];
    this.initGames(genre);

  }

  scrollToTop(){
    this.content.scrollToTop();
  }

   /**
   * Click event
   */
   openFavourites() {
    this.openModal();
  }

  /**
   * Open Ionic modal - favourite games
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
      spinner: 'crescent',
      backdropDismiss:false,

    })
    await loading.present();

    this.gamesService.getGames(genre).subscribe(res =>{
      this.games.push(res); //getting all games to arr
      this.displayedGames[0] = this.games[0].slice(0, this.limit); //getting limited amount of games to arr
      loading.dismiss()

    });
  }

  /**
   * Handling loading more games after scrolling
   * @param event onInfinite Scroll event
   */
  loadMore(event:any) {
    console.log(event);
    this.displayedGames[0] = this.displayedGames[0].concat(this.games[0].
      slice(this.displayedGames[0].length, this.displayedGames[0].length + this.limit)); //adding 10 more games to display
    event.target.complete();
}

/**
 * Adding game to favourite, storing data to local storage
 * @param game selected game
 */
  async addToFavorites(game : any){
    let stored;
    await this.storageService.getData('favourites').then(res=>{
      this.favourites = res;
    })
    if(this.favourites == undefined){
      this.favourites = [];
    }
    //check if game not in favourites
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

