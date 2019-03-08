import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the GeoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-geo',
  templateUrl: 'geo.html',
})
export class GeoPage {
  latitude: any;
  longitude: any;
  old_latitude: any;
  old_longitude: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation,public storage: Storage) {
    this.loadLat(); 
    this.loadLong();
  }

  getGeo(event) {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.storage.set('latitude',resp.coords.latitude);
      this.storage.set('longitude',resp.coords.longitude);
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });    
  }

  getGeoStorage(event) {
    this.loadLat(); 
    this.loadLong();
  }

  loadLat() {
    return this.getLatStorage().then(result => {
      if (result) {
        this.old_latitude = result;
      }
    });
  }

  loadLong() {
    return this.getLongStorage().then(result => {
      if (result) {
        this.old_longitude = result;
      }
    });
  }
 
  getLatStorage() {
    return this.storage.get('latitude')
  }

  getLongStorage() {
    return this.storage.get('longitude')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeoPage');
  }

}
