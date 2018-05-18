import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';

import { ContentItem } from '../../../models/content-item/content-item.interface';

@Component({
  selector: 'page-add-content',
  templateUrl: 'add-content.html',
})
export class AddContentPage {

  // Creating a new Object 
  contentItem = {} as ContentItem;

  // contentItemRef$: AngularFireList<ContentItem[]>
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private afdatabase: AngularFireDatabase) {
     this.afdatabase.list('/content-list').valueChanges();

    /*
      content-list:
        0:
          itemName: 'Pizza',
          itemNumber: 1
        1:
          itemName: 'Cheesecake',
          itemNumber: 5
    */
  }
  
  async addContentItem(contentItem: ContentItem){

    const ref = await this.afdatabase.database.ref('/content-list/');

    ref.push(contentItem).then(res => {

      console.log(res.key);
      const key = res.key;
      contentItem.key = key;
      this.afdatabase.database.ref('/content-list/'+contentItem.key).update(contentItem).then(res=>{
        
        console.log("finished adding new content");
        console.log(contentItem.key);
      })
    });
 

    // Reset our contentItem
    this.contentItem = {} as ContentItem;

    // Navigate the user back to the contentListPage
    this.navCtrl.pop();
  }

}
