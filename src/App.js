
import { useState } from 'react';
import './App.css';

function App() {

  
  const [todoTitle, setTodoTitle] = useState("")
  const [todoBody, setTodoBody] = useState()

  const [todos, setTodos] = useState([])

  const [editTodoold, setEditTodoold] = useState(null)
  const [editingText, setEditingText] = useState("")
  const [editingTitle, setEditingTitle] = useState("")

  const [modal, setModal] = useState(false)

  let date = new Date()


  const submitHandler = e => {
    e.preventDefault()


    const newTodo = {
      id: new Date().getTime(),
      createdAt: date.toLocaleString('en-GB'),
      title: todoTitle,
      text: todoBody,
      edited: false
    }

    setTodos([...todos].concat(newTodo))

    setTodoBody("") 
    setTodoTitle("") 
  }


  function deleteTodo(id){
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }


  function editTodo(id){
    const updatedTodos = [...todos].map((todo) => {
      if(todo.id == id){
        todo.title = editingTitle;
        todo.text = editingText
        todo.createdAt = date.toLocaleString('en-GB');
        todo.edited = true
      }
      return todo
    })
    setTodos(updatedTodos)
    setEditTodoold(null)
    setEditingText("")
    setEditingTitle("")
    todoBody.edited = true
  }

  

  return (
    <div className="App">
      <h1>TO-DO APP</h1>
      <br/>
      <hr/>
      {
        modal==false ? 
        <div>
        <p>THERE IS NO TODO</p>
        <button onClick={() => setModal(true)} className="btn btn-success"  type="button" data-toggle="modal" data-target="#exampleModalCenter">OPEN TODO ADD FORM!</button>
        {
          modal == true && todos == 0 ? <div>
          <hr/>
          <div>
            <form onSubmit={submitHandler}>
          <input 
          placeholder='TITLE OF TODO'
          onChange={(e) => setTodoTitle(e.target.value)}
          />
          <input
          placeholder='BODY OF TODO' 
          type="text"
          value={todoBody}
          onChange={(e) => setTodoBody(e.target.value)}/>
          <button type='submit' className="btn btn-success">SUBMIT</button>
          </form>
          </div>
          </div>
          : null 
        }
        
        </div>
        :
        <div>
        <form onSubmit={submitHandler}>
        <input 
          placeholder='TITLE OF TODO'
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <input
        placeholder='BODY OF TODO' 
        type="text"
        value={todoBody}
        onChange={(e) => setTodoBody(e.target.value)}/>
        <button type='submit' className="btn btn-success">SUBMIT</button>
        </form>
        </div>
      }
      
      <hr/>
      {todos.map((todo) => 
      <div>
        {
        editTodoold == todo.id ?

        <div>
        <input type="text" onChange={(e) => setEditingTitle(e.target.value)} value={editingTitle} placeholder={todo.title}/>
        <input type="text" onChange={(e) => setEditingText(e.target.value)} value={editingText} placeholder={todo.text}/>
        <button onClick={() => editTodo(todo.id)} className="btn btn-success">CONFIRM EDIT</button>
        </div>
         : 
        <div>
        TITLE OF TODO: <b>{todo.title}</b>
        <br/>
        BODY OF TODO: {todo.text}
        <br/>
        CREATED AT: {todo.createdAt}
        <br/>
        <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger">DELETE</button>

        <button onClick={() => setEditTodoold(todo.id)} className="btn btn-info">EDIT</button>
        </div>
        }
        <hr/>
      </div>)}
      
    </div>
  );
}

export default App;
