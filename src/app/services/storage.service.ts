import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import { Preferences, KeysResult } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  /**
   * Save data to storage
   *
   * @param key
   * @param data
   */
  async saveData(key: string, data: any) {
    await Preferences.set({
      // key: key,
      key,
      value: JSON.stringify(data),
    });
  }

  /**
   * Get data from storage
   *
   * @param key
   */
  async getData(key: string) {
    const {value} = await Preferences.get({key});
    if(value){
      return JSON.parse(value);
    }
  }


  }


