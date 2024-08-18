import { NavLink } from "react-router-dom"


function Signin() {
  return (
    <div className='flex flex-col justify-center items-center '>
         <h1 className="py-2 font-serif text-3xl text-gray-500">Register account...</h1>
    <div className='flex flex-col justify-center items-center h-screen '>

      <form className=" text-black flex flex-col py-6 justify-center items-center  bg-stone-200  ">
     <div className="flex justify-between px-8  items-center py-2 w-full">
     <label>EmailId </label>
        <input type="text" placeholder="enter your email"
        className="px-6 rounded-md py-1 "/ >
     </div>
     <div className="flex justify-between px-8 items-center py-2 w-full">
     <label>Password </label>
        <input type="password" placeholder="enter your password"
        className="px-6 rounded-md py-1"/ >
     </div>
     <div className="flex gap-10 px-8 items-center py-2 w-full">
     <label>enter your Name </label>
        <input type="text" placeholder="enter your Name"
        className="px-6 rounded-md py-1"/ >
     </div>
     
        
      </form>
      <NavLink to="/login">Already have an account?</NavLink>
      
    </div>
    </div>
   
  )
}

export default Signin
