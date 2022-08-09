import { useTodoStore } from "./useTodoStore";

const TodoItem = (props) => {
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  const handleClickEdit = useTodoStore((state) => state.handleClickEdit);

  const isCompleteTodo = useTodoStore((state) => state.isCompleteTodo);

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
        {props.isCompleted ? (
          <div>
            MARKED AS DONE AT: <b>{new Date().toLocaleString("en-GB")}</b>
          </div>
        ) : null}
        {!props.isCompleted ? (
          <button
            onClick={() => isCompleteTodo(props.id, true)}
            class="btn btn-success"
          >
            Done
          </button>
        ) : (
          <button
            onClick={() => isCompleteTodo(props.id, false)}
            class="btn btn-secondary"
          >
            UnDone
          </button>
        )}
        <button onClick={() => deleteTodo(props.id)} class="btn btn-danger">
          Delete
        </button>
        {props.isCompleted ? null : (
          <button
            class="btn btn-primary"
            onClick={() => handleClickEdit(props.id)}
          >
            Edit
          </button>
        )}
      </div>
      <hr />
    </div>
  );
};

export default TodoItem;
