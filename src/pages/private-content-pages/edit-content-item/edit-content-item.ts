import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ContentItem } from '../../../models/content-item/content-item.interface';
import { DataSnapshot } from '@firebase/database-types';

@Component({
  selector: 'page-edit-content-item',
  templateUrl: 'edit-content-item.html',
})
export class EditContentItemPage {

  contentItemSubscription: Subscription;
  contentItemRef$: AngularFireList<ContentItem>;
  contentItem = {} as ContentItem;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afdatabase: AngularFireDatabase) {
  
    // // Capture the contentItemId as a NavParameter
    const contentItemId = this.navParams.get('contentItemId');

    // // Log out the NavParam
    console.log(contentItemId);

    // // Set the scope of our Firebase Object equal to our selected item
    // this.contentItem.key = this.database.object(`content-list/${contentItemId}`).valueChanges();

    // // Subscribe to the Object and assign the result to this.contentItem
    // this.contentItemSubscription =
    //   this.contentItemRef$.valueChanges().subscribe(
    //   contentItem => this.contentItem = contentItem);
  }

  editContentItem(contentItem: ContentItem) {
    
 // // Capture the contentItemId as a NavParameter
 const contentItemId = this.navParams.get('contentItemId');

 
//    // console.log(`${contentItem}`);
 // Delete the current contentItem, passed in via the parameter
            this.afdatabase.database.ref('/content-list/'+contentItemId)
            .update(contentItem)
            .then(res=>{ console.log("item updated"); });
    // Send the user back to the contentListPage
    this.navCtrl.pop();

  }


    
  // }
  // public void onDataChange(contentItem: Con) {
  //   for ( objSnapshot: DataSnapshot snapshot.getChildren()) {
  //           Object obj = objSnapshot.getKey();
  //   }

  ionViewWillLeave() {
    // Unsubscribe from the Observable when leaving the page
    // this.contentItemSubscription.unsubscribe();
  }

}
