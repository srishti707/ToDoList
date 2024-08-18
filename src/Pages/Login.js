import { GoogleAuthProvider } from "firebase/auth";
import { db } from "../firebase";
import { auth } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useContext, useEffect } from "react";
import { AuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();
function Login() {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [user, navigate]);

  async function handleSignInWithGoogle() {
    try {
      const userdata = await signInWithPopup(auth, provider);
      const userId = userdata.user.providerData[0].uid;
      const docRef = doc(db, `users/${userId}`); //just a refrence to the path.
      const snapshot = await getDoc(docRef); //gets whatever doc present in that path.
      if (snapshot.exists()) {
        //check if the doc is present in that path.
        updateUser(userdata.user.providerData[0]); //if doc present than userdata is send to updateuser function.
      } else {
        await setDoc(docRef, userdata.user.providerData[0]); //if doc is not present in that path then insert the userdata in that path i.e in docRef using setDoc
      }
    } catch (error) {
      //....
    }
  }
  return (
    <div>
      <div className="flex items-center justify-center">
        <h1 className="py-2 font-serif text-3xl text-gray-500">
          Login to your account
        </h1>
      </div>

      <div className="flex flex-col justify-center items-center h-screen ">
        {/* <form className=" text-black flex flex-col justify-center items-center ">
          <div className="flex gap-14 px-8  items-center py-2  bg-stone-200">
            <label>EmailId </label>
            <input
              type="text"
              placeholder="enter your email"
              className="px-6 rounded-md py-1"
            />
          </div>
          <div className="flex gap-10 px-8 items-center py-2  bg-stone-200">
            <label>Password </label>
            <input
              type="password"
              placeholder="enter your password"
              className="px-6 rounded-md py-1"
            />
          </div>
        </form> */}
        <button className="px-6 py-3 rounded-md font-bold border border-blue-500" onClick={handleSignInWithGoogle}>Sign in with Google</button>
      </div>
    </div>
  );
}

export default Login;
