import { ref } from "vue";
import { fetchTodo } from "../utils/fetch";

export default function useTodoList () {
    const refToDoList = ref(fetchTodo());
    return {
        refToDoList
    }
}