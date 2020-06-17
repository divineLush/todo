import { v4 as uuidv4 } from 'uuid'

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
        this.id = uuidv4()
    }
}