import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../shared/data.service';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: Todo[] = [];
  showValidationErrors: boolean = true;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos();
    // console.log(this.todos[0].text);
  }

  onFormSubmit(form: NgForm) {
    if(form.touched && form.invalid)
      return this.showValidationErrors = true;
    console.log("Form submitted")
    console.log(form)

    this.dataService.addTodo(new Todo(form.value.text));

    this.showValidationErrors = false
    form.reset()
    return
  }

}
