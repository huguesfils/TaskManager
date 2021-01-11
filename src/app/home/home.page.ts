import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentDate: string;
  myTask: string;
  description: string;
  addTask: boolean;
  tasks = [];

  constructor( public afDB: AngularFireDatabase) {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    this.currentDate = date.toLocaleDateString('fr-FR', options);
    this.getTasks();
  }

  addTaskToFirebase() {
    this.afDB.list('Tasks/').push({
      text: this.myTask,
      description: this.description,
      date: new Date().toISOString(),
    });
    this.showForm();
  }
  
  showForm() {
    this.addTask = !this.addTask;
    this.myTask = '';
    this.description = '';
  }

  getTasks() {
    this.afDB.list('Tasks/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.tasks = [];
      actions.forEach(action => {
        this.tasks.push({
          key: action.key,
          text: action.payload.exportVal().text,
          description: action.payload.exportVal().description,
          date: action.payload.exportVal().date.substring(11, 16),
        });
      });
    });
  }

  deleteTask(task: any) {
    this.afDB.list('Tasks/').remove(task.key);
  }

  editTask(task: any){
  
  }

}
