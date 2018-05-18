import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { AddContentPage } from '../add-content/add-content';
import { ContentItem } from '../../../models/content-item/content-item.interface';
import { EditContentItemPage } from '../edit-content-item/edit-content-item';
@Component({
  selector: 'page-content-list',
  templateUrl: 'content-list.html',
})
export class ContentListPage {

  contentListRef$: AngularFireList<ContentItem[]>
  items: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afdatabase: AngularFireDatabase,
    private actionSheetCtrl: ActionSheetController) {
    /*
      Pointing contentListRef$ at Firebase -> 'content-list' node.
      That means not only can we push things from this reference to the database, but ALSO we have access to everything inside of that node. 
    */

   this.afdatabase.list<any>('content-list').valueChanges().subscribe(data=> { this.items = data});
    // this.contentListRef$ = this.database.list('content-list');
  }

  /*
    Display an ActionSheet that gives the user the following options:

    1. Edit the contentItem
    2. Delete the contentItem
    3. Cancel the selection
  */
  selectContentItem(contentItem: ContentItem) {
    this.actionSheetCtrl.create({
      title: `${contentItem.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            // Send the user to the EditcontentItemPage and pass the key as a parameter
            this.navCtrl.push(EditContentItemPage,
              { contentItemId: contentItem.key });
            
            /*
             Navigation stack:
             
              ['contentListPage',
               'EditcontentItemPage',
               { contentItemId: '-KowULdyLOK4ruWoKhws'}]
            
            */
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
          
            // Delete the current contentItem, passed in via the parameter
            this.afdatabase.database.ref('/content-list/'+`${contentItem.key}`)
            .remove()
            .then(res=>{ console.log("item removed"); });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("The user has selected the cancel button");
          }
        }
      ]
    }).present();
  }


  navigateToAddContentPage() {
    // Navigate the user to the AddcontentPage
    this.navCtrl.push(AddContentPage);
  }

}
