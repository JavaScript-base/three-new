import { Ref, ref } from "vue";
import { ITodoItem, generateId, increase } from "../utils/fetch";

export default function useNewTodo (todoList: Ref<[ITodoItem]>) {
    const newTodoRef = ref("");

    console.log(888, todoList.value)
    
    const addTodo = () => {
        const value = newTodoRef.value && newTodoRef.value.trim();

        if(!value) return;

        const newTodo: ITodoItem = {
            id: generateId(),
            name: value,
            isComplate: false
        }

        todoList.value.push(newTodo)
        newTodoRef.value = "";
        increase(newTodo);
    }    
    return {
        newTodoRef,
        addTodo
    }
}