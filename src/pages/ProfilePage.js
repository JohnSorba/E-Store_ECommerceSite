import { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { useUser } from "../components/AuthContext";
import ProfileEdit from "../components/ProfileEdit";

function Profile({ storeUserData }) {
  const { currentUser } = useAuth();
  const { user, setUser } = useUser();
  const [newUserProfile, setUserProfile] = useState({ displayName: "" });
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  console.log(currentUser);
  console.log(user);
  const userUid = currentUser?.uid;

  if (currentUser !== null) {
    const userData = {
      email: currentUser.email,
      displayName: currentUser.displayName,
    };

    storeUserData(userUid, userData);
  }

  return (
    <div className="h-screen px-40">
      <header className="grid grid-cols-1 items-center h-1/5">
        <h1 className="text-5xl font-semibold">
          {currentUser?.displayName == null ? (
            <p>Welcome User</p>
          ) : (
            <p>Welcome {currentUser?.displayName}</p>
          )}
        </h1>
      </header>

      <section className="grid grid-cols-8 gap-8">
        <article className="col-span-2 flex flex-col gap-4 items-end">
          <div className="py-2 px-2 border-b border-gray-300 w-full text-right">
            <button>Edit Profile</button>
          </div>
          <div className="py-2 px-2 border-b border-gray-300 w-full text-right">
            Address
          </div>
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
            />
          }
        </article>
      </section>
    </div>
  );
}

export default Profile;
