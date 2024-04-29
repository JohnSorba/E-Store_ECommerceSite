import { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { useUser } from "../components/AuthContext";
import ProfileEdit from "../components/ProfileEdit";
import { useNavigate } from "react-router-dom";

function Profile({ storeUserData }) {
  const { currentUser } = useAuth();
  const { user, setUser } = useUser();
  const [newUserProfile, setUserProfile] = useState({ displayName: "" });
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [editMode, setEditMode] = useState(false);

  console.log(currentUser);
  console.log(user);
  const userUid = currentUser?.uid;

  const navigate = useNavigate();

  if (currentUser !== null) {
    const userData = {
      email: currentUser.email,
      displayName: currentUser.displayName,
    };

    storeUserData(userUid, userData);
  }

  const viewOrders = () => {
    navigate("/orders");
  };

  return (
    <div className="h-screen px-40">
      <header className="flex items-center justify-between h-1/5">
        <h1 className="text-5xl font-semibold">
          {currentUser?.displayName == null ? (
            <p>Welcome User</p>
          ) : (
            <p>Welcome {currentUser?.displayName}</p>
          )}
        </h1>
      </header>

      <section className=" flex items-center gap-16">
        <button onClick={viewOrders} className="bg-blue-400 text-white">
          View Latest Orders
        </button>
        <button
          onClick={() => setEditMode(!editMode)}
          className="bg-blue-400 text-white"
        >
          {editMode ? "Cancel" : "Edit Profile"}
        </button>
      </section>

      <section className="grid grid-cols-8 gap-8">
        <article className="col-span-2 flex flex-col gap-4 items-end">
          {/* <div className="py-2 px-2 border-b border-gray-300 w-full text-right">
            <button>Edit Profile</button>
          </div>
          <div className="py-2 px-2 border-b border-gray-300 w-full text-right">
            Address
          </div> */}
          {/* <div className="py-2 px-2 border-b border-gray-300 w-full text-right">
            Nav 3
          </div>
          <div className="py-2 px-2 border-b border-gray-300 w-full text-right">
            Nav 4
          </div> */}
        </article>
        <article className="col-span-6 border-l px-8">
          {
            <ProfileEdit
              newEmail={newEmail}
              newPassword={newPassword}
              newUserProfile={newUserProfile}
              setEmail={setNewEmail}
              setPassword={setNewPassword}
              setUserProfile={setUserProfile}
              editMode={editMode}
            />
          }
        </article>
      </section>
    </div>
  );
}

export default Profile;
