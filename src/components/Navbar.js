import { NavLink } from "react-router-dom";
import { useAuth, useUser } from "./AuthContext";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ cartItemCount }) {
  const { currentUser, logout } = useAuth();
  const [isDropDown, setIsDropDown] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth();
  const user = auth.currentUser;

  if (user !== null) {
    console.log("user is signed in");
  } else {
    console.log("User is signed out");
  }
  const handleLogout = () => {
    logout(); // Clear user data
    navigate("/"); // Redirect to the home page
  };

  const toggleDropdown = () => {
    setIsDropDown((prevState) => !prevState);
  };

  return (
    <nav className="flex items-center justify-between px-40 py-2 bg-white fixed top-0 left-0 right-0 shadow-sm">
      <NavLink to="/" className="text-xl font-bold font-serif">
        E-STORE
      </NavLink>
      <ul className="nav">
        <li>
          <NavLink to="/#products-section">Products</NavLink>
        </li>
        {currentUser ? (
          <>
            <li>
              <NavLink to="/cart" className="flex gap-0 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                {cartItemCount !== 0 ? cartItemCount : 0}
              </NavLink>
            </li>{" "}
            <li className={`relative group ${isDropDown ? "active" : ""}`}>
              <button
                onClick={toggleDropdown}
                className="flex items-center border-none rounded-none p-0 bg-transparent text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                {user?.displayName !== null ? user?.displayName : user?.email}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 ml-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isDropDown && (
                <div className="dropdown w-32">
                  {/*AUTHENTICATION*/}

                  <NavLink
                    to={`/profile/${
                      user?.displayName !== null ? user?.displayName : user?.uid
                    }`}
                    className="flex items-center dropdown-link hover:bg-slate-200 hover:border-l-slate-900 hover:border-l-4"
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/wishlist"
                    className="flex gap-0 items-center dropdown-link hover:bg-slate-200 hover:border-l-slate-900 hover:border-l-4"
                  >
                    Wishlist
                  </NavLink>

                  <NavLink
                    to="/orders"
                    className="flex gap-0 items-center dropdown-link hover:bg-slate-200 hover:border-l-slate-900 hover:border-l-4"
                  >
                    Your Orders
                  </NavLink>

                  <span
                    onClick={handleLogout}
                    className="dropdown-link cursor-pointer hover:bg-slate-200 hover:border-l-slate-900 hover:border-l-4 border-t-2"
                  >
                    Sign Out
                  </span>
                </div>
              )}
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login" className="flex gap-0 items-center">
                Login{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
              </NavLink>
            </li>
            <li className="bg-slate-600 px-2 py-1 rounded-lg">
              <NavLink
                to="/register"
                className="flex gap-0 items-center text-white font-bold"
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

/*  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg> */
