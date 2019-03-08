import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { BlePage } from '../pages/ble/ble';
import { GeoPage } from '../pages/geo/geo';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { SqlProvider } from '../providers/sql/sql';
import { BLE } from '@ionic-native/ble';
import { Firebase } from '@ionic-native/firebase';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    BlePage,
    GeoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    BlePage,
    GeoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    BLE,
    Firebase,
    IonicStorageModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SqlProvider
  ]
})
export class AppModule {}
