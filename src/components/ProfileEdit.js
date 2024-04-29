import {
  getAuth,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import "../pages/ProfileEdit.css";

function ProfileEdit({
  newEmail,
  newPassword,
  newUserProfile,
  setEmail,
  setPassword,
  setUserProfile,
  editMode,
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;

  const handleInputChange = (e) => {
    // console.log("profile update");

    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Destructure user object (avoid modifying original state)
    const { email, password, currentPassword } = { ...user };
    const newEmail = email !== user.email ? email : null; // Update email if changed
    const newPassword = password ? password : null; // Update password if changed

    console.log(user);

    if (!currentPassword) {
      // Handle missing current password error
      return;
    }

    try {
      const credential = reauthenticateWithCredential(
        getAuth(auth).currentUser,
        signInWithEmailAndPassword(getAuth(auth), user.email, currentPassword)
      );

      // Update email if necessary
      await credential.user.updateEmail(newEmail);
      if (newPassword) {
        // Update password if necessary
        await updatePassword(getAuth(auth).currentUser, newPassword);
      }

      // Update user state with changes (clear new password)
      setUser({ ...user, email: newEmail || email, password: "" });
      setEditMode(false);

      console.log(user);
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle errors (e.g., invalid email format, incorrect current password)
    }
  };

  return (
    <div>
      {" "}
      {/* Edit Form */}
      {editMode && (
        <div className="alert-container">
          <form onSubmit={handleSave} className="alert">
            <input type="text" defaultValue={user?.displayName} />
            <input
              type="email"
              defaultValue={user?.email}
              disabled={!editMode}
            />{" "}
            {/* Email */}
            <input
              type="password"
              placeholder="Current Password"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />{" "}
            {/* New Password */}
            <input
              type="password"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
            {/* Current Password for Verification */}
            <button type="submit">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProfileEdit;

/*

  const handleUpdateProfile = () => {
    const updateNewProfile = async () => {
      try {
        await updateProfile(user, { displayName: newUserProfile.displayName });
        console.log("profile updated successfully");
      } catch (error) {
        console.log("PROFILE UPDATE ERROR", error);
      }
    };
    updateNewProfile();

    const updateNewEmail = async (newEmail) => {
      try {
        await updateEmail(user, newEmail);
        console.log("Email Updated");
      } catch (error) {
        console.error("Email UPDATE ERROR: ", error);
      }
    };
    updateNewEmail(newEmail);

    const updateNewPassword = async (newPassword) => {
      try {
        await updatePassword(user, newPassword);
        console.log("Password Update Successful");
      } catch (error) {
        console.log("Password UPDATE ERROR", error);
      }
    };
    updateNewPassword(newPassword);
  };

<div>
  <h2 className="mb-4 text-lg font-semibold">Edit Profile</h2>
  <div className="mb-4">
    <label className="font-semibold mb-2">Username:</label>
    <input
      type="text"
      name="displayName"
      value={newUserProfile.displayName}
      onChange={handleInputChange}
      className="py-1 px-2 border border-gray-500 ml-4"
    />
  </div>
  <div className="mb-4">
    <label className="font-semibold mb-2">New Email:</label>
    <input
      type="email"
      value={newEmail}
      onChange={(e) => setEmail(e.target.value)}
      className="py-1 px-2 border border-gray-500 ml-4"
    />
  </div>
  <div className="mb-4">
    <label className="font-semibold">New Password:</label>
    <input
      type="password"
      value={newPassword}
      onChange={(e) => setPassword(e.target.value)}
      className="py-1 px-2 border border-gray-500 ml-4"
    />
  </div>
  <button onClick={handleUpdateProfile}>Update Profile</button>
</div>;
*/
