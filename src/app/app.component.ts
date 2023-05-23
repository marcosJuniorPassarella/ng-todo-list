import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TodoFormComponent } from './components/todo-form/todo-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TodoFormComponent],
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent {
  title = 'ng-todo-list';
}
