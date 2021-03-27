import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { DataService } from '../shared/data.service';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: Todo[] = [];
  showValidationErrors: boolean = false;

  constructor(private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos();
    // console.log(this.todos[0].text);
  }

  onFormSubmit(form: NgForm) {
    console.log("main form")
    if(form.invalid)
      return this.showValidationErrors = true;

    this.dataService.addTodo(new Todo(form.value.text));

    this.showValidationErrors = false
    form.reset()
    this.todos = this.dataService.getAllTodos()
    return
  }

  setCompleted(todo: Todo) {
    // todo.completed = !todo.completed;
    this.todos = this.dataService.getAllTodos()
    this.dataService.updateStatus(this.getIndex(todo)!);
    this.todos = this.dataService.getAllTodos()
  }

  editTodo(todo: Todo) {
    
    const index = this.getIndex(todo)!

    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService.updateTodo(index, result)
        this.todos = this.dataService.getAllTodos()
      }
    })
  }

  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.dataService.deleteTodo(index)
    this.todos = this.dataService.getAllTodos()
  }

  getIndex(todo: Todo) {
    var i:number; 

    for(i = 0; i<this.todos.length; i++) {
      if (this.todos[i].text == todo.text && this.todos[i].completed == todo.completed)
      {
        return i
      }
    }
    return
  }

}
