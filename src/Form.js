import { useState } from "react";
import { useTodoStore } from "./useTodoStore";
import Modal from "react-modal";

const Form = () => {
  const [formState, setFormState] = useState({ title: "", body: "" });
  const addTodo = useTodoStore((state) => state.addTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const modalSituation = useTodoStore((state) => state.modalSituation);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEditMode = false;

    if (isEditMode) {
      updateTodo();
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
          Add
        </button>
        <button
          onClick={() => modalSituation.closeModal()}
          class="btn btn-danger"
        >
          close modal
        </button>
      </form>
    </>
  );
};

export default Form;
