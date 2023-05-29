import { Component, computed, inject, effect, OnInit } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TodoSignalsService } from 'src/app/services/todo-signals.service';
import { Todo } from 'src/app/models/todo.model';
import { TodoKey } from 'src/app/models/todoKey.enum';
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
export class TodoCardComponent implements OnInit {
  private todoSignalsService = inject(TodoSignalsService);
  private todosSignal = this.todoSignalsService.todosState;
  public todosList = computed(() => this.todosSignal());

  constructor() {
    effect(() => {
      console.log('Effect', this.todoSignalsService.todosState());
    });
  }

  public ngOnInit(): void {
    this.getTodosInLocalStorage();
  }

  public handleDoneTodo(todoId: number): void {
    if (todoId) {
      this.todosSignal.mutate((todos) => {
        const todoSelected = todos.find((todo) => todo?.id === todoId) as Todo;
        todoSelected.done = true;
      });
      this.saveTodosInTheLocalStorage();
    }
  }

  public handleDeleteTodo(todoId: Todo): void {
    if (todoId) {
      const index = this.todosList().indexOf(todoId);

      if (index !== -1) {
        this.todosSignal.mutate((todos) => {
          todos.splice(index, 1);
          this.saveTodosInTheLocalStorage();
        });
      }
    }
  }

  private saveTodosInTheLocalStorage(): void {
    const todos = JSON.stringify(this.todosSignal());
    localStorage.setItem(TodoKey.TODO_LIST, todos);
  }

  private getTodosInLocalStorage(): void {
    const data = localStorage.getItem(TodoKey.TODO_LIST) as string;
    data && this.todosSignal.set(JSON.parse(data));
  }
}
