import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { PopoverController } from '@ionic/angular';
import {PopoverComponent} from '../popover/popover.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentDate: string;
  title: string;
  description: string;
  addTask: boolean;
  tasks = [];

  constructor(public afDB: AngularFireDatabase, public popoverController: PopoverController) {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    this.currentDate = date.toLocaleDateString('fr-FR', options);
    this.getTasks();
  }

  async showHelp(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: false
    });
    return await popover.present();
  }

  addTaskToFirebase() {
    this.afDB.list('Tasks/').push({
      title: this.title,
      description: this.description,
      date: new Date().toISOString(),
    });
    this.showForm();
  }
  
  showForm() {
    this.addTask = !this.addTask;
    this.title = '';
    this.description = '';
  }

  getTasks() {
    this.afDB.list('Tasks/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.tasks = [];
      actions.forEach(action => {
        this.tasks.push({
          key: action.key,
          title: action.payload.exportVal().title,
          description: action.payload.exportVal().description,
          date: action.payload.exportVal().date.substring(11, 16),
        });
      });
    });
  }

  deleteTask(task: any) {
    this.afDB.list('Tasks/').remove(task.key);
  }
  editTask(task:any){
    this.deleteTask(task);
    this.showForm();
    this.title = task.title;
    this.description = task.description;
    }

}


