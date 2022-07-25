import create from "zustand";

export const useTodoStore = create((set, get) => ({
  todos: [],

  isEditMode: false,

  modalIsOpen: false,

  activateModal: (value) =>
    set(() => ({
      modalIsOpen: value,
    })),

  activateEditMode: (value) => {
    set(() => ({
      isEditMode: value,
    }));
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
      isEditMode: false,
    })),

  deleteTodo: (todoId) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== todoId),
    })),

  handleClickEdit: (todoId) => {
    const todo = get().todos.find((i) => i.id === todoId);

    set(() => ({
      isEditMode: true,
      modalIsOpen: true,
      formState: {
        title: todo.title,
        text: todo.body,
      },
    }));
  },

  changeEditMode: (value) =>
    set((state) => ({
      isEditMode: value,
    })),

  UpdateTodo: (todoId) => {
    const todo = get().todos.find((i) => i.id === todoId);

    set((state) => ({
      isEditMode: false,
      modalIsOpen: false,
      formState: {
        title: todo.title,
        text: todo.body,
      },
    }));
  },

  isCompleteTodo: (todoId, value) =>
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
}));
