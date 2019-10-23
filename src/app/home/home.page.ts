import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../components/modal/modal.component';

import { faCloudMeatball } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  faCloudMeatball = faCloudMeatball;
  public items: any = [];
  modelMateria: Array<any> = [];
  materiaFiltered: Array<any> = [];
  modelConcepto: Array<any> = [];

  constructor(private apiService: AppService, public toastController: ToastController, public modalController: ModalController) {
    this.items = [
      { expanded: false, name: "Uno", id: 1, color: "#007bff", textColor: "white" },
      { expanded: false, name: "Dos", id: 2, color: "#6c757d", textColor: "white" },
      { expanded: false, name: "Tres", id: 3, color: "#28a745", textColor: "white" },
      { expanded: false, name: "Cuatro", id: 4, color: "#dc3545", textColor: "white" },
      { expanded: false, name: "Cinco", id: 5, color: "#ffc107", textColor: "black" },
      { expanded: false, name: "Seis", id: 6, color: "#17a2b8", textColor: "white" },
      { expanded: false, name: "Siete", id: 7, color: "#f8f9fa", textColor: "black" },
      { expanded: false, name: "Ocho", id: 8, color: "#343a40", textColor: "white" },
      { expanded: false, name: "Nueve", id: 9, color: "#fff", textColor: "black" },
      { expanded: false, name: "Diez", id: 10, color: "#007bff", textColor: "white" },
    ];
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentModal(nombreMateria: string) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        modelConcepto: this.modelConcepto,
        nombreMateria: nombreMateria
      }
    });
    return await modal.present();
  }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.getMateria(item.id);
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });

    }
  }

  getMateria(semestre: any) {
    this.getMateriaSuccess({
      idSemestre: semestre
    }).subscribe(operationResult => {
      console.log(operationResult)
      this.modelMateria = [];
      this.materiaFiltered = [];
      this.modelConcepto = [];
      if (operationResult.data.length > 0) {
        this.modelMateria = operationResult.data;
        this.materiaFiltered = operationResult.data;
      } else {
        this.presentToast('El semestre ' + semestre + ' no tiene materias asignadas');
      }
    });
  }

  getMateriaSuccess(ObjectValue: any): Observable<any> {
    return this.apiService.Post('materia/getMateriaSemestre', ObjectValue).pipe(
      catchError(this.handleError)
    );
  }

  getConcepto(materia: any) {

    this.getConceptoSuccess({
      idMateria: materia.id
    }).subscribe(operationResult => {
      if (operationResult.data.length > 0) {
        this.modelConcepto = operationResult.data;
        this.presentModal(materia.nombreMateria);
      } else {
        this.modelConcepto = [];
        this.presentToast('No hay conceptos asignados a la materia');
      }
    });
  }
  getConceptoSuccess(ObjectValue: any): Observable<any> {
    return this.apiService.Post('concepto/getConceptoMateria', ObjectValue).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    return throwError(err);
  }

  filter(txt) {
    if (txt != "" && this.modelMateria.length >= 1) {
      this.materiaFiltered = this.modelMateria.filter(m => m.nombreMateria.toLowerCase().includes(txt.toLowerCase()));
      console.log(this.materiaFiltered);
      return;
    }
    this.materiaFiltered = this.modelMateria;
  }
}
