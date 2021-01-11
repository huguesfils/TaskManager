import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ModalController } from '@ionic/angular';
import { Action } from 'rxjs/internal/scheduler/Action';
import { MyTaskPage } from '../my-task/my-task.page';

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

  constructor(public afDB: AngularFireDatabase, public modalController: ModalController) {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    this.currentDate = date.toLocaleDateString('fr-FR', options);
    this.getTasks();
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

  async displayTask(){
    console.log('Tasks: ' + JSON.stringify(this.tasks));
    const modal = await this.modalController.create({
      component: MyTaskPage,
      componentProps: this.tasks
    });
    return await modal.present();
  }
}


