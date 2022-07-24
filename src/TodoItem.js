import { useTodoStore } from "./useTodoStore";

const TodoItem = (props) => {
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  const handleClickEdit = useTodoStore((state) => state.handleClickEdit);

  const completeSituation = useTodoStore((state) => state.completeSituation);

  const EditTodo = useTodoStore((state) => state.EditTodo);

  return (
    <div className="App">
      <div>
        <span
          style={{
            textDecoration: props.isCompleted ? "line-through" : "unset",
          }}
        >
          TITLE OF TODO: <b>{props.title}</b>
        </span>
        <br />
        <span
          style={{
            textDecoration: props.isCompleted ? "line-through" : "unset",
          }}
        >
          BODY OF TODO: <b>{props.text}</b>
        </span>
        <br />
        <span
          style={{
            textDecoration: props.isCompleted ? "line-through" : "unset",
          }}
        ></span>
        CREATED AT: <b>{props.createdAt}</b>
        <br />
        {!props.isCompleted ? (
          <button
            onClick={() => completeSituation.completeTodo(props.id)}
            class="btn btn-success"
          >
            Done
          </button>
        ) : (
          <button
            onClick={() => completeSituation.incompleteTodo(props.id)}
            class="btn btn-secondary"
          >
            UnDone
          </button>
        )}
        <button onClick={() => deleteTodo(props.id)} class="btn btn-danger">
          Delete
        </button>
        <button
          class="btn btn-primary"
          onClick={() => handleClickEdit(props.id)}
        >
          Edit
        </button>
      </div>
      <hr />
    </div>
  );
};

export default TodoItem;
