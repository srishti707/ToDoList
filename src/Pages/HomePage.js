import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { messaging } from "../firebase";
import { getToken } from "firebase/messaging";
import { doc, setDoc, updateDoc, deleteDoc,get, getDoc } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { db } from "../firebase";
import useTodo from "../hooks/useTodos";

const HomePage = () => {
  const { user, updateUser } = useContext(AuthContext);
  const {allTodos,loading} = useTodo();
  console.log(allTodos)
  console.log(user)
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      //Generate Token
      const token = await getToken(messaging, {
        vapidKey:
          "BJOCQdl8cEQmQqoEKC9XccONjgapqZk400gPAImD4bhgAoLhB2k4VJBA3HnUGsE4whMn0XGCQv92Rev3kFiygMM",
      });
      console.log("Token generated", token);
    } else if (permission === "denied") {
      alert("You denied for the notifications");
    }
  }
  useEffect(() => {
    requestPermission();
  }, []);
  const [todo, setToDo] = useState(""); //text of 1 todo item
  const [todos, setToDos] = useState([]); //array of all todos
  const [showfinished, setShowFinished] = useState(true);
  const [saving,setSaving] = useState(false)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    console.log(todoString);
    if (todoString) {
      console.log("insideit");
      let todos = JSON.parse(localStorage.getItem("todos"));
      setToDos(todos);
    }
  }, []);

  const handleAdd = async () => {
    setSaving(true);
    const newTodo = { id: uuidv4(), todo, isCompleted: false };

    const docRef = doc(db, `users/${user.uid}/todos/${newTodo.id}`);
    await setDoc(docRef, {
      todo: newTodo,
    });
    setToDo("");
    setSaving(false);
  };
  //adds a new todo item to the todos array

  const handleEdit = async(e, id) => {
    let t = allTodos.filter((i) => i.todo.id === id);
    setToDo(t[0].todo.todo);
    console.log(t);
    const docRef = doc(db, `users/${user.uid}/todos/${id}`)
    await deleteDoc(docRef)
    console.log("deleted");
  };

  const handleDelete = async(e, id) => {
    const docRef = doc(db, `users/${user.uid}/todos/${id}`)
    await deleteDoc(docRef)
    console.log("deleted");
  };

  const handleChange = (e) => {
    setToDo(e.target.value);
  };
  const handleCheckbox = async(e) => {
    let id = e.target.name;
    const docRef = doc(db,`users/${user.uid}/todos/${id}`);
    const docSnap =await getDoc(docRef);
    const res = docSnap.data();
    console.log(res)
    await updateDoc(docRef, {
      isCompleted:!res.isCompleted,
    });
    console.log("done")
  };
  const toggleFinished = (e) => {
    setShowFinished(!showfinished);
  };
  return (
    <>
      <Navbar />
      <div className="md:container md:mx-auto my-5 rounded-xl p-5 bg-slate-200 min-h-[80vh]">
        <h1 className="font-bold text-center text-xl">
          iTask-Manage your ToDos at one place
        </h1>
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
            disabled={todo.length <= 3}
            className="hover:bg-indigo-700  disabled:bg-slate-600 bg-indigo-900 p-4 py-2 text-sm font-bold text-white rounded-md  w-1/2 lg:w-1/4 mx-auto"
          >
            {saving ? "saving..." : "save"}
          </button>
        </div>
        <input
          onChange={toggleFinished}
          type="checkbox"
          checked={showfinished}
        />
        Show completed tasks
        <h2 className="text-lg font-bold ">Your ToDos</h2>
        <div className="todos ">
          {allTodos && allTodos.length === 0 && (
            <div className="m-5 ">No ToDos to display</div>
          )}
          {loading && <p>Loading...</p>}
          {allTodos &&
            allTodos.map((item) => {
              return (
                (showfinished || !item.isCompleted) && (
                  <div
                    key={item.todo.id}
                    className="todo flex w-full my-3 justify-between"
                  >
                    <div className="flex gap-5">
                      <input
                        type="checkbox"
                        checked={item.isCompleted}
                        onChange={handleCheckbox}
                        name={item.todo.id}
                        id=""
                      />
                      <div className="flex flex-wrap">
                        <div
                          className={`${
                            item.isCompleted ? "line-through" : ""
                          } break-words whitespace-normal lg:max-w-full max-w-72`}
                        >
                          {item.todo.todo}
                        </div>
                      </div>
                    </div>
                    <div className="buttons flex h-full">
                      <button
                        onClick={(e) => {
                          handleEdit(e, item.todo.id);
                        }}
                        className="hover:bg-indigo-600 hover:px-3  bg-indigo-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => {
                          handleDelete(e, item.todo.id);
                        }}
                        className="hover:bg-indigo-600 hover:px-3  bg-indigo-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-2"
                      >
                        <AiFillDelete />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
        </div>
      </div>
    </>
  );
};

export default HomePage;
