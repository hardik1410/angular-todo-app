export class Todo {
    [x: string]: any;
    text!: string;
    completed!: boolean;

    constructor(text: string, completed: boolean = false) {
        this.text = text;
        this.completed = completed;
    }
}