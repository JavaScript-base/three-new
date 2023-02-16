export interface ITodoItem {
    id: string,
    name: string,
    isComplate: boolean
}

export function fetchTodo() {
    const result = localStorage.getItem('toDoList');
    if(result) {
        return JSON.parse(result);
    }
    return [];
}

export function filterTodo(str: string) {
    const result = localStorage.getItem('toDoList');
    if(!result) return [];
    return JSON.parse(result).filter((item: any) => item.name.indexof(str) > -1 )
}

export function increase(item: ITodoItem) {
    const result = localStorage.getItem('toDoList');
    if(result) {
        JSON.parse(result).push(item)
        localStorage.setItem('toDoList', JSON.stringify(result))
    } else {
        localStorage.setItem('toDoList', JSON.stringify([item]))
    }
}

export function editItem(item: ITodoItem) {
    const result = localStorage.getItem('toDoList');
    if(result) {
        const data = JSON.parse(result).map((t: ITodoItem) => {
            if(t.id === item.id) {
                t = item
            }
        })
        localStorage.setItem('toDoList', JSON.stringify(JSON.parse(data)))
    }
}

export function generateId() {
    return Date.now() + Math.random().toString(16).substr(2, 4);
}