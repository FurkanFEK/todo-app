import create from "zustand";

export const useTodoStore = create((set, get) => ({
  todos: [],

  modalSituation: {
    modalIsOpen: false,
    openModal: () =>
      set((state) => ({
        modalIsOpen: true,
      })),
    closeModal: () =>
      set((state) => ({
        modalIsOpen: false,
      })),
  },

  addTodo: (todoText, todoTitle) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          text: todoText,
          title: todoTitle,
          id: new Date(),
          isCompleted: false,
          createdAt: new Date().toLocaleString("en-GB"),
        },
      ],
      modalIsOpen: false,
    })),

  deleteTodo: (todoId) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== todoId),
    })),

  handleClickEdit: (todoId) => {
    const todo = get().todos.find((i) => i.id === todoId);

    set(() => ({
      modalIsOpen: true,
      formState: {
        title: todo.title,
        body: todo.body,
      },
    }));
  },

  completeSituation: {
    completeTodo: (todoId) =>
      set((state) => ({
        todos: state.todos.map((todo) => {
          if (todo.id === todoId) {
            return {
              ...todo,
              isCompleted: true,
            };
          }

          return todo;
        }),
      })),
    incompleteTodo: (todoId, value) =>
      set((state) => ({
        todos: state.todos.map((todo) => {
          if (todo.id === todoId) {
            return {
              ...todo,
              isCompleted: value,
            };
          }

          return todo;
        }),
      })),
  },
}));
