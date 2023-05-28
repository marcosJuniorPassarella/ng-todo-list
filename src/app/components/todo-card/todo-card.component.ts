import { Component, computed, inject, effect } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TodoSignalsService } from 'src/app/services/todo-signals.service';
import { Todo } from 'src/app/models/todo.model';
@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
    NgFor,
    NgTemplateOutlet,
    NgIf,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
  ],
  templateUrl: './todo-card.component.html',
  styleUrls: [],
})
export class TodoCardComponent {
  private todoSignalsService = inject(TodoSignalsService);
  private todosSignal = this.todoSignalsService.todosState;
  public todosList = computed(() => this.todosSignal());

  constructor() {
    effect(() => {
      console.log('Effect observando', this.todoSignalsService.todosState());
    });
  }

  public handleDoneTodo(todoId: number): void {
    if (todoId) {
      this.todosSignal.mutate((todos) => {
        const todoSelected = todos.find((todo) => todo?.id === todoId) as Todo;
        todoSelected.done = true;
      });
      const todos = this.todosList().find((todo) => todo.id === todoId);
      console.log('TODO FILTRADO', todos);
    }
  }

  public handleDeleteTodo(todoId: number): void {
    if (todoId) {
      console.log('todoId');
    }
  }
}
