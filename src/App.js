import React, { useEffect, useState } from "react";
 import Navbar from "./components/Navbar";
 import {FaEdit} from "react-icons/fa";
 import {AiFillDelete} from "react-icons/ai";
import {v4 as uuidv4} from 'uuid';

const App = () => {
  const [todo, setToDo] = useState(""); //text of 1 todo item
  const [todos, setToDos] = useState([]);//array of all todos
  const[showfinished,setShowFinished] = useState(true)
 
  useEffect(() => {
  
    let todoString = localStorage.getItem("todos")
    console.log(todoString)
    if(todoString){
      console.log("insideit")
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setToDos(todos)
    }
  }, [])
  

  const saveToLS = (params) => {
  let prevTodos = localStorage.getItem("todos");
    if(prevTodos) {
      prevTodos = JSON.parse(prevTodos)
      localStorage.setItem("todos",JSON.stringify([...prevTodos,params]));
    } else {
      localStorage.setItem("todos", JSON.stringify([params]))
    }
  }
  const handleAdd = () => {
    setToDos((prev)=>[...prev, { id:uuidv4(), todo, isCompleted: false }]);
    setToDo("");
    saveToLS({ id:uuidv4(), todo, isCompleted: false })
  };
   //adds a new todo item to the todos array

  const handleEdit = (e,id) => {
    let t=todos.filter(i=>i.id===id)
    setToDo(t[0].todo)
    let newToDos=todos.filter(item=>{
      return item.id!==id
    })
    setToDos(newToDos)
    localStorage.removeItem("todos")
   localStorage.setItem("todos",JSON.stringify(newToDos))
  };

  const handleDelete = (e,id) => {
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    console.log(index)
    let newToDos=todos.filter(item=>{
      return item.id!==id});
    setToDos(newToDos);
    localStorage.removeItem("todos")
    localStorage.setItem("todos",JSON.stringify(newToDos))
  };

  const handleChange=(e)=>{
    setToDo(e.target.value);
  }
  const handleCheckbox=(e)=>{
   let id= e.target.name
   let index=todos.findIndex(item=>{
    return item.id===id;
   })
   let newToDos=[...todos];
   newToDos[index].isCompleted=!newToDos[index].isCompleted;
   setToDos(newToDos);
   console.log(newToDos);
   localStorage.removeItem("todos")
    localStorage.setItem("todos",JSON.stringify(newToDos))
  
  }
  const toggleFinished=(e)=>{
    setShowFinished(!showfinished)
  }
  return (
    <>
      <Navbar /> 
      <div className="md:container md:mx-auto my-5 rounded-xl p-5 bg-slate-200 min-h-[80vh]">
       <h1 className="font-bold text-center text-xl">iTask-Manage your ToDos at one place</h1>
        <div className="addToDo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full py-2 px-2 rounded-full"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length<=3}
            className="hover:bg-indigo-700  disabled:bg-slate-600 bg-indigo-900 p-4 py-2 text-sm font-bold text-white rounded-md  w-1/2 lg:w-1/4 mx-auto"
          >
            Save
          </button>
        </div>
        <input onChange={toggleFinished}
        type="checkbox" checked={showfinished}/>Show completed tasks
        <h2 className="text-lg font-bold ">Your ToDos</h2>
        <div className="todos ">
        {todos && todos.length===0 && <div className="m-5 ">No ToDos to display</div>}

        {todos && todos.map((item) => {
  return ((showfinished||!item.isCompleted)&&
    <div key={item.id} className="todo flex w-full my-3 justify-between">
      <div className="flex gap-5">
        <input
          type="checkbox"
          checked={item.isCompleted}
          onChange={handleCheckbox}
          name={item.id}
          id=""
        />
        <div className="flex flex-wrap">
          <div className={`${item.isCompleted ? "line-through" : ""} break-words whitespace-normal lg:max-w-full max-w-72`}>
            {item.todo}
          </div>
        </div>
      </div>
      <div className="buttons flex h-full">
        <button
          onClick={(e) => { handleEdit(e, item.id) }}
          className="hover:bg-indigo-600 hover:px-3  bg-indigo-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-2"
        >
          <FaEdit/>
          </button>
        <button
          onClick={(e) => { handleDelete(e, item.id) }}
          className="hover:bg-indigo-600 hover:px-3  bg-indigo-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-2"
        >
          <AiFillDelete/>
        </button>
      </div>
    </div>
  );
})}

        </div>
     
      </div>
    </>
    
  );
  
};

export default App;
