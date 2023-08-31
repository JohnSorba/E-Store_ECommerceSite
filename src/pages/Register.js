import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { ref, set } from "firebase/database";

function Register({ db, storeUserData }) {
  const { currentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  console.log("db in Register: ", db);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // User registered successfully
      const user = userCredential.user;
      console.log("Registered User: ", user);

      const userData = {
        displayName: user.displayName,
        email: user.email,
      };

      storeUserData(user.uid, userData);
      console.log("stored data: ", storeUserData);

      localStorage.setItem("user", userData);
      navigate("/login");
    } catch (error) {
      setError(error.message);
      console.error("Registration error: ", error);
    }
  };

  return (
    <div className="text-center h-screen grid grid-cols-2 place-items-center">
      <div className="bg-slate-600 h-full w-full text-7xl text-white grid place-items-center">
        Hi!
      </div>
      {error && <p>{error}</p>}
      {!currentUser ? (
        <div className="w-2/5">
          <h1 className="mb-8 text-2xl">Sign Up</h1>
          <form
            onSubmit={handleRegister}
            className="flex flex-col gap-6 border-2 border-blue-400 rounded-lg px-4 py-4"
          >
            <div>
              <input
                type="text"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-500 rounded-md py-2 px-2 w-full"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-500 rounded-md py-2 px-2 w-full"
              />
            </div>
            <div>
              <button
                type="submit"
                className="outline outline-blue-500 bg-transparent text-lg text-black hover:text-white hover:bg-blue-500 mt-8 w-2/3"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      ) : (
        <p>You are already logged in as {currentUser.email}</p>
      )}
    </div>
  );
}

export default Register;
