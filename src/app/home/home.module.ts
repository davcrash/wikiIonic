import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ExpandableComponent } from "../components/expandable/expandable.component";
import { ModalComponent } from '../components/modal/modal.component';
import { SafeHtmlPipe } from '../safe-html.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, ExpandableComponent, ModalComponent, SafeHtmlPipe],
  providers: [ModalComponent],
  entryComponents: [ModalComponent]
})
export class HomePageModule { }
