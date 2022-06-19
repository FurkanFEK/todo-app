
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
      duzenlendi: false
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
        todo.duzenlendi = true
      }
      return todo
    })
    setTodos(updatedTodos)
    setEditTodoold(null)
    setEditingText("")
    setEditingTitle("")
    todoBody.duzenlendi = true
  }

  

  return (
    <div className="App">
      <h1>TO-DO APP</h1>
      <br/>
      <hr/>
      {
        todos == 0 ? 
        <div>
        <p>To do yok!</p>
        <button onClick={() => setModal(true)} className="btn">Todo ekleme ekranını aç!</button>
      
        {
          modal == true ? <div>
            <hr/>
          <form onSubmit={submitHandler}>
          <input 
          placeholder='Todo başlığı giriniz!'
          onChange={(e) => setTodoTitle(e.target.value)}
          />
          <input
          placeholder='Todo içeriği giriniz!' 
          type="text"
          value={todoBody}
          onChange={(e) => setTodoBody(e.target.value)}/>
          <button type='submit'>Ekle</button>
          </form>
          </div>
          : null 
        }
        </div>
        :
        <div>
        <form onSubmit={submitHandler}>
        <input 
          placeholder='Todo başlığı giriniz!'
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <input
        placeholder='Todo Giriniz!' 
        type="text"
        value={todoBody}
        onChange={(e) => setTodoBody(e.target.value)}/>
        <button type='submit'>Ekle</button>
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
        <button onClick={() => editTodo(todo.id)}>Düzeni Onayla</button>
        </div>
         : 
        <div>
        Todo Başlığı: <b>{todo.title}</b>
        <br/>
        Todo: {todo.text}
        <br/>
        Oluşturulma Tarihi: {todo.createdAt}
        <br/>
        <button onClick={() => deleteTodo(todo.id)}>Sil</button>

        <button onClick={() => setEditTodoold(todo.id)}>Düzenle</button>
        </div>
        }
        <hr/>
      </div>)}
      
    </div>
  );
}

export default App;
