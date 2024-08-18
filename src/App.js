import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Protected from "./components/Protected"
import Login from './Pages/Login'
import Signin from './Pages/SignIn'
import AuthContextProvider from './store/AuthContext'
const Router=createBrowserRouter([
  {
    path:"/",
    element:(
      <Protected>
        <HomePage/>
      </Protected>         
    )
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signin",
    element:<Signin/>
  }
])
function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={Router}/>
    </AuthContextProvider>
  );
}

export default App;
