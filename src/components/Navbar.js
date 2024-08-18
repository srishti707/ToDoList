import React, { useContext } from 'react'
import { AuthContext } from '../store/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

const Navbar = () => {
  const {user,updateUser} =  useContext(AuthContext)
  return (
    <nav className='flex justify-between bg-indigo-900 text-white py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>iTask</span>
        </div>
      <ul className="flex gap-8 mx-9">
        {!user && <li className='cursor-pointer hover:font-bold transition-all'>LogIn</li>}
        {user && <li onClick={async()=>{
          await signOut(auth)
          updateUser(null);
          }}className='cursor-pointer hover:font-bold transition-all'>Sign out</li>}
      </ul>
    </nav>
  )
}

export default Navbar
