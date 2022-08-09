import { useState } from "react";

import Modal from "react-modal";

import { useTodoStore } from "./useTodoStore";
import Form from "./Form";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const todos = useTodoStore((state) => state.todos);

  const modalIsOpen = useTodoStore((state) => state.modalIsOpen);

  const activateModal = useTodoStore((state) => state.activateModal);

  const changeEditMode = useTodoStore((state) => state.changeEditMode);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "#eee",
      borderRadius: "20px",
    },
    overlay: {
      backgroundColor: "rgba(255, 255, 255, 0.45)",
    },
  };

  return (
    <>
      <h2>TODO APP</h2>
      <hr />
      {todos == 0 ? (
        <div>
          <h5>there is no any todo</h5>
          <button
            onClick={() => {
              changeEditMode(false);
              activateModal(true);
            }}
            class="btn btn-success"
          >
            open add todo form
          </button>
        </div>
      ) : (
        <div>
          <Modal isOpen={modalIsOpen} style={customStyles}>
            <Form />
          </Modal>
          <button
            onClick={() => {
              changeEditMode(false);
              activateModal(true);
            }}
          >
            open add todo form
          </button>
          <hr />
          {todos.map((todo) => {
            return <TodoItem key={todo.id} {...todo} />;
          })}
        </div>
      )}

      {modalIsOpen == true ? (
        <Modal isOpen={modalIsOpen} style={customStyles}>
          <Form />
        </Modal>
      ) : null}
    </>
  );
}
