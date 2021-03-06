import { v4 as uuidv4 } from 'uuid'

export class EmptyTodo {
    constructor() {
        this.name = ''
        this.isCompleted = false
        this.id = uuidv4()
    }
}

export class EmptyNote {
    constructor() {
        this.title = ''
        this.todos = [new EmptyTodo()]
        this.id = uuidv4()
    }
}

export const filteredNoteTodos = note =>
    note.todos
        .filter(todo => /\S/.test(todo.name))

export const deepClone = obj =>
    JSON.parse(JSON.stringify(obj))

export const disabledBtnClass = condition =>
    ({ 'btn--disabled': condition })

export const filterByID = (obj, id) =>
    obj.filter(item => item.id !== id)
