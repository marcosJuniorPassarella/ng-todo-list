import { Injectable, signal } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoKey } from '../models/todoKey.enum';

@Injectable({
  providedIn: 'root',
})
export class TodoSignalsService {
  public todosState = signal<Array<Todo>>([]);

  public updateTodos({ id, title, description, done }: Todo): void {
    if ((title && id && description !== null) || undefined) {
      this.todosState.mutate((todos) => {
        if (todos !== null) {
          todos.push(new Todo(id, title, description, done));
        }
      });
      this.saveTodosInTheLocalStorage();
    }
  }

  private saveTodosInTheLocalStorage(): void {
    const todos = JSON.stringify(this.todosState());
    localStorage.setItem(TodoKey.TODO_LIST, todos);
  }
}
