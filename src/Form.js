import { useState } from "react";
import { useTodoStore } from "./useTodoStore";

const Form = (props) => {
  const [formState, setFormState] = useState({ title: "", body: "" });
  const addTodo = useTodoStore((state) => state.addTodo);
  const UpdateTodo = useTodoStore((state) => state.UpdateTodo);
  const activateModal = useTodoStore((state) => state.activateModal);
  const isEditMode = useTodoStore((state) => state.isEditMode);
  const changeEditMode = useTodoStore((state) => state.changeEditMode);
  const infos = useTodoStore((state) => state.infos);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      addTodo(formState.body, formState.title);
      UpdateTodo(formState.body, formState.title);
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
              ? () => UpdateTodo(formState.body, formState.title)
              : () => addTodo(formState.body, formState.title)
          }
        >
          {isEditMode ? <div>Update</div> : <div>Add</div>}
        </button>
        <button
          onClick={() => {
            isEditMode ? changeEditMode(false) : changeEditMode(true);

            activateModal(false);
          }}
          class="btn btn-danger"
        >
          close modal
        </button>
      </form>
    </>
  );
};

export default Form;
