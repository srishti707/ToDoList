import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Protected({children}){
const navigate=useNavigate();
useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
        if(!user){
            navigate("/login")
        }
        })
},[navigate])
return(
    <>
        {children}
    </>
)

}
export default Protected