import { useContext, useEffect,useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../store/AuthContext";


function useTodo() {
  const { user } = useContext(AuthContext);
  const [allTodos,setAllTodos] = useState([]);
  const [loading, setLoading]= useState(false);
  useEffect(()=>{
      setLoading(true);
      const colRef = collection(db, `users/${user?.uid}/todos`);
      onSnapshot(colRef, (docSnapshot) => {
        //   const todos = docSnapshot.docs.map(todo=>todo.data());
        //   setAllTodos(todos);
        //   setLoading(false);
        console.log(docSnapshot);
        const allTodos = docSnapshot.docs.map(todo=>todo.data());
        setAllTodos(allTodos);
        setLoading(false);
      });
  },[user])
  return {allTodos,loading}
}

export default useTodo;