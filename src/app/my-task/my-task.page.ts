import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.page.html',
  styleUrls: ['./my-task.page.scss'],
})
export class MyTaskPage {
  


  constructor() {
  
     }

  close() {
    this.modalController.dismiss();
  }
}
