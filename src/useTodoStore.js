import create from "zustand";


export const useTodoStore = create((set) => ({
    todos: [],
    addTodo: (todoText, todoTitle) =>
      set((state) => ({
        todos: [...state.todos,{
            text: todoText,
            title: todoTitle,
            id: new Date(),
            isCompleted: false,
            createdAt: new Date().toLocaleString('en-GB'),
        }]
      })),

    deleteTodo: (todoId) =>
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== todoId)
      })),

    completeTodo: (todoId) => 
      set((state) => ({
        todos: state.todos.map((todo) => {
            if (todo.id === todoId){
                return {
                    ...todo,
                    isCompleted: true
                };
            }

            return todo;
        })
      })),
      incompleteTodo: (todoId) => 
      set((state) => ({
        todos: state.todos.map((todo) => {
            if (todo.id === todoId){
                return {
                    ...todo,
                    isCompleted: false
                };
            }

            return todo;
        })
      }))
}))