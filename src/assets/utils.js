export class EmptyTodo {
    constructor() {
        this.name = ''
        this.isCompleted = false
    }
}

export class EmptyNote {
    constructor() {
        this.title = ''
        this.todos = [new EmptyTodo()]
    }
}