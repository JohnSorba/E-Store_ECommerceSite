import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuth, useUser } from "../components/AuthContext";
import "firebase/auth";

function Login({ getCartData }) {
  const { currentUser } = useAuth();
  const { user, setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    // Check if user is logged in and location is login path
    if (currentUser && window.location.pathname === "/login") {
      navigate("/"); // Replace '/home' with your desired redirect path
    }
  }, [currentUser]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const userUid = currentUser?.uid;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      setUser(user);
      // await getCartData(userUid);

      console.log("Logged In User Successfully: ", user);
      // User successfully logged in, handle success scenario (e.g., redirect)
      navigate(
        `/profile/${user?.displayName !== null ? user?.displayName : user?.uid}`
      );
    } catch (error) {
      const errorCode = error.code;
      let errorMessage;

      switch (errorCode) {
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/user-not-found":
          errorMessage = "Email not found. Please check your email address.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email format. Please enter a valid email.";
          break;
        default:
          errorMessage = "An error occurred. Please try again later.";
      }
      console.error("Login error", error.message);
      setWarning(errorMessage);
    }
  };

  return (
    <div className="text-center h-screen grid grid-cols-2 place-items-center">
      <div className="bg-slate-600 h-full w-full text-7xl text-white grid place-items-center">
        Hi!
      </div>
      {currentUser ? (
        <p>You are already signed in as, {user?.email}</p>
      ) : (
        <div className="">
          <h1 className="mb-8 text-2xl">Log In</h1>
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-4 border-2 border-blue-400 rounded-lg px-8 py-8"
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

          <p className="mt-8 text-red-600">{warning}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
