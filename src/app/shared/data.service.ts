import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { 
    
  }

  getAllTodos() {
    let localStorageItem = JSON.parse(localStorage.getItem('todos')!);
    return localStorageItem == null ? [] : localStorageItem.todos;
    // return this.todos;
  }

  addTodo(todo: Todo) {
    // this.todos.push(todo);
    // let todo = new Todo(todo)
    console.log(todo);
    let todos = this.getAllTodos();
    console.log(todos)
    todos.push(todo);

    this.setLocalStorageTodos(todos);
  }

  updateTodo(index: number, updatedTodo: Todo) {
    let todos = this.getAllTodos();
    console.log(updatedTodo)
    todos[index] = updatedTodo;
    this.setLocalStorageTodos(todos)
  }

  deleteTodo(index: number) {
    let todos:Todo[] = this.getAllTodos();
  
    todos.splice(index, 1);
    
    this.setLocalStorageTodos(todos)
  }

  updateStatus(index: number) {
    let todos:Todo[] = this.getAllTodos();
    
    let tempTodo = todos[index]
    
    tempTodo.completed = !tempTodo.completed
    todos[index] = tempTodo
    this.setLocalStorageTodos(todos)
  }

  private setLocalStorageTodos(todos: Todo[]): void {
    localStorage.setItem('todos', JSON.stringify({todos: todos}));
  }
}
