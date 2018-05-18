import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
 
import { MyApp } from './app.component';

import { ContentListPage } from '../pages/private-content-pages/content-list/content-list';
import { AddContentPage } from '../pages/private-content-pages/add-content/add-content';
import { EditContentItemPage } from '../pages/private-content-pages/edit-content-item/edit-content-item';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FIREBASE_CREDENTIALS } from './firebase.credentials';
import { AngularFireModule } from 'angularfire2';

 
@NgModule({
  declarations: [
    MyApp,
    ContentListPage,
    AddContentPage,
    EditContentItemPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
             // Initialise AngularFire with credientials from the dashboard
             AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
             // Import the AngularFireDatabaseModule to use database interactions
             AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContentListPage,
    AddContentPage,
    EditContentItemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}