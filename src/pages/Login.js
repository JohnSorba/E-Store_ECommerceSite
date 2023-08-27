import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../components/AuthContext";
import "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const { currentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      console.log("Logged In User: ", user);

      navigate("/");
    } catch (error) {
      console.error("Login error", error.message);
    }
  };

  return (
    <div className="text-center h-screen grid grid-cols-2 place-items-center">
      <div className="bg-slate-600 h-full w-full text-7xl text-white grid place-items-center">
        Hi!
      </div>
      {currentUser ? (
        <p>You are currently logged in as {currentUser.email}</p>
      ) : (
        <div className="">
          <h1 className="mb-8 text-2xl">Log In</h1>
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-4 border-2 border-blue-400 rounded-lg px-4 py-4"
          >
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-500 rounded-md py-2 px-2"
            />

            <input
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-500 rounded-md py-2 px-2"
            />

            <div>
              <button
                type="submit"
                className="outline outline-blue-500 bg-transparent text-lg text-black hover:text-white hover:bg-blue-500 mt-8 w-2/3"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
