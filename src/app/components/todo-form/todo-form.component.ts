import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './todo-form.component.html',
  styleUrls: [],
})
export class TodoFormComponent {
  public todoForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  constructor(public dialogRef: MatDialogRef<HeaderComponent>) {}

  public handleCreateNewTask(): void {
    this.dialogRef.close();
    console.log(this.todoForm);
  }

  public handleCloseModal(): void {
    this.dialogRef.close();
  }
}
