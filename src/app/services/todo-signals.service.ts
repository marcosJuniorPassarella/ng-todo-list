import { Injectable, signal } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoSignalsService {
  private todosState = signal<Array<Todo> | null>([]);

  public updateTodos({ id, title, description, done }: Todo): void {
    if ((title && id && description !== null) || undefined) {
      this.todosState.mutate((todos) => {
        if (todos !== null) {
          todos.push(new Todo(id, title, description, done));
          console.log('TODOS', this.todosState());
        }
      });
    }
  }
}
