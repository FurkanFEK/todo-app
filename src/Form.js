import { useState } from "react";
import { useTodoStore } from "./useTodoStore";
import Modal from "react-modal";

const Form = (todoId) => {
  const [formState, setFormState] = useState({ title: "", body: "" });
  const addTodo = useTodoStore((state) => state.addTodo);
  const UpdateTodo = useTodoStore((state) => state.UpdateTodo);
  const activateModal = useTodoStore((state) => state.activateModal);
  const EditTodo = useTodoStore((state) => state.EditTodo);
  const isEditMode = useTodoStore((state) => state.isEditMode);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      UpdateTodo(todoId);
    }

    setFormState({ title: "", body: "" });
  };

  const onChange = (e, field) => {
    setFormState((s) => ({ ...s, [field]: e.target.value }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="new-todo-title"
          name="newTodoTitle"
          value={formState.title}
          onChange={(e) => onChange(e, "title")}
          placeholder="TODO TITLE"
        />
        <input
          type="text"
          id="new-todo"
          name="newTodo"
          value={formState.body}
          onChange={(e) => onChange(e, "body")}
          placeholder="TODO VALUE"
        />
        <button
          type="submit"
          class="btn btn-success"
          onClick={() => addTodo(formState.body, formState.title)}
        >
          {isEditMode ? <div>Update</div> : <div>Add</div>}
        </button>
        <button onClick={() => activateModal(false)} class="btn btn-danger">
          close modal
        </button>
      </form>
    </>
  );
};

export default Form;
