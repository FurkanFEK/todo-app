
import { useState } from 'react';
import './App.css';

function App() {

  const [todo, setTodo] = useState()
  const [todos, setTodos] = useState([])

  const [todoEditing, setTodoEditing] = useState(null)
  const [editingText, setEditingText] = useState("")
  const [editingTitle, setEditingTitle] = useState("")

  const [modal, setModal] = useState(false)

  const [todoTitle, setTodoTitle] = useState("")


  const submitHandler = e => {
    e.preventDefault()

  const gunler = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]

    const newTodo = {
      id: new Date().getTime(),
      createTimeHour: new Date().getHours(),
      createTimeMinute: new Date().getMinutes(),
      createTimeSeconds: new Date().getSeconds(),
      createTimeDay: gunler[new Date().getDay()],
      title: todoTitle,
      text: todo,
      düzenlendi: false
    }

    setTodos([...todos].concat(newTodo))

    setTodo("") 
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
        todo.createTimeHour = new Date().getHours()
        todo.createTimeMinute = new Date().getMinutes()
        todo.createTimeSeconds = new Date().getSeconds()
        todo.düzenlendi = true
      }
      return todo
    })
    setTodos(updatedTodos)
    setTodoEditing(null)
    setEditingText("")
    setEditingTitle("")
    todo.düzenlendi = true
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
          value={todo}
          onChange={(e) => setTodo(e.target.value)}/>
          <button type='submit'>Ekle</button>
          </form>
          </div>
          :
         <>
         </>  
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
        value={todo}
        onChange={(e) => setTodo(e.target.value)}/>
        <button type='submit'>Ekle</button>
        </form>
        </div>
      }
      
      <hr/>
      {todos.map((todo) => 
      <div>
        {
        todoEditing == todo.id ?

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
        Oluşturulma Tarihi: {todo.createTimeHour}:{todo.createTimeMinute}:{todo.createTimeSeconds} - {todo.createTimeDay}
        <br/>
        <button onClick={() => deleteTodo(todo.id)}>Sil</button>

        <button onClick={() => setTodoEditing(todo.id)}>Düzenle</button>
        </div>
        }
        <hr/>
      </div>)}
      
    </div>
  );
}

export default App;
