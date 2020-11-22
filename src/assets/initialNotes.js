import { v4 as uuidv4 } from 'uuid'

export const initialNotes = [
    {
        title: 'Reading',
        id: uuidv4(),
        todos: [
            {
                name: '30 min',
                isCompleted: false,
                id: uuidv4()
            }
        ]
    },
    {
        title: 'Education',
        id: uuidv4(),
        todos: [
            {
                name: '30 min',
                isCompleted: false,
                id: uuidv4()
            }
        ]
    },
    {
        title: 'Burpees',
        id: uuidv4(),
        todos: [
            {
                name: '30 min',
                isCompleted: false,
                id: uuidv4()
            }
        ]
    },
    {
        title: 'Writing',
        id: uuidv4(),
        todos: [
            {
                name: '30 min',
                isCompleted: false,
                id: uuidv4()
            }
        ]
    },
    {
        title: 'Void',
        id: uuidv4(),
        todos: [
            {
                name: '20 min',
                isCompleted: false,
                id: uuidv4()
            }
        ]
    },
    {
        title: 'Eyes',
        id: uuidv4(),
        todos: [
            {
                name: '10 min',
                isCompleted: false,
                id: uuidv4()
            }
        ]
    }
]
