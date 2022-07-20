import { useTodoStore } from "./useTodoStore";
import { useState } from "react";


export default function TodoList() {
    const [todoValue, setTodoValue] = useState("");
    const [todoTitle, setTodoTitle] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const {todos, addTodo, deleteTodo, completeTodo, incompleteTodo} = useTodoStore(
        (state) => state
    );

    
    const handleSubmit = (e) => {
        e.preventDefault();

        addTodo(todoValue, todoTitle);
        setTodoValue("");
        setTodoTitle("");
    };


    return(
        <>
        <h2>TODO APP</h2>
        <hr/>
        {
          modalIsOpen == false ? 
          <div>
            <p>There is no todo</p> 
            <button onClick={() => setModalIsOpen(true)}>open todo add form!</button>
          </div>
          : 
          <div>
            <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="new-todo-title"
              name="newTodoTitle"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
              placeholder="TODO TITLE"
            />
            <input
              type="text"
              id="new-todo"
              name="newTodo"
              value={todoValue}
              onChange={(e) => setTodoValue(e.target.value)}
              placeholder="TODO VALUE"
            />
            <button type="submit" class="btn btn-success">Add</button>
          </form>
        </div>
        }
        <hr/>
          <div>
          
            {todos.map((todo) => {
                return(
                  <div key={todo.id} className="App">
                    <div>
                      <span
                      style={{textDecoration: todo.isCompleted ? "line-through" : "unset"}}>
                      TITLE OF TODO: <b>{todo.title}</b>
                      </span>
                      <br/>
                      <span
                      style={{textDecoration: todo.isCompleted ? "line-through" : "unset"}}> 
                      BODY OF TODO: <b>{todo.text}</b>
                      </span>
                      <br/>
                      <span
                      style={{textDecoration: todo.isCompleted ? "line-through" : "unset"}}>
                      </span>
                      CREATED AT: <b>{todo.createdAt}</b>
                      <br/>
                      {!todo.isCompleted ? (
                        <button onClick={() => completeTodo(todo.id)} class="btn btn-success">Done</button>
                    ) : <button onClick={() => incompleteTodo(todo.id)} class="btn btn-secondary">UnDone</button>}
                    <button onClick={() => deleteTodo(todo.id)} class="btn btn-danger">Delete</button>
                    <button class="btn btn-primary">edit</button>
            </div>
            <hr/>
            </div>
            
                );
            })}
          </div>
        </>
    );
}