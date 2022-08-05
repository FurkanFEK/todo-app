import { useState } from "react";
import { useTodoStore } from "./useTodoStore";
import Modal from "react-modal";

const Form = (props) => {
  const [formState, setFormState] = useState({ title: "", body: "" });
  const addTodo = useTodoStore((state) => state.addTodo);
  const UpdateTodo = useTodoStore((state) => state.UpdateTodo);
  const activateModal = useTodoStore((state) => state.activateModal);
  const isEditMode = useTodoStore((state) => state.isEditMode);
  const changeEditMode = useTodoStore((state) => state.changeEditMode);
  const todo = useTodoStore((state) => state.todo);
  const infos = useTodoStore((state) => state.infos);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      addTodo(formState.body, formState.title);
      UpdateTodo(formState.body, formState.title, props.id);
    }

    setFormState({ title: "", body: "" });
  };

  const onChange = (e, field) => {
    setFormState((s) => ({ ...s, [field]: e.target.value }));
  };

  const closeModal = () => {
    isEditMode ? changeEditMode(false) : changeEditMode(true);

    activateModal(false);
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
          placeholder={isEditMode ? infos.title : "TODO TITLE"}
        />
        <input
          type="text"
          id="new-todo"
          name="newTodo"
          value={formState.body}
          onChange={(e) => onChange(e, "body")}
          placeholder={isEditMode ? infos.text : "TODO VALUE"}
        />
        <button
          type="submit"
          class="btn btn-success"
          onClick={
            isEditMode
              ? () => UpdateTodo(todo.id)
              : () => addTodo(formState.body, formState.title)
          }
        >
          {isEditMode ? <div>Update</div> : <div>Add</div>}
        </button>
        <button onClick={() => closeModal()} class="btn btn-danger">
          close modal
        </button>
      </form>
    </>
  );
};

export default Form;
