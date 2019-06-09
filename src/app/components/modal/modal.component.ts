import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() nombreMateria: string;
  @Input() modelConcepto: any;
  @Input() concepto: any;



  constructor(public modalCtrl: ModalController, public modalController: ModalController) { }

  ngOnInit() {
    console.log(this.concepto);
  }

  async presentModal(concepto: any) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: { concepto: concepto }
    });
    return await modal.present();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
