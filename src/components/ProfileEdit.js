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
  userData,
  setUserProfile,
  editMode,
  setEditMode,
  message,
  setMessage,
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user.displayName);

  console.log("current user: ", user);

  // const handleInputChange = (e) => {
  //   // console.log("profile update");

  //   const { name, value } = e.target;
  //   setUserProfile((prevProfile) => ({
  //     ...prevProfile,
  //     [name]: value,
  //   }));
  // };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      // var user = firebase.auth().currentUser;
      const curPass = currentPassword; // Get current password from form input
      const newPass = newPassword; // Get new password from form input

      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        curPass
      );

      await user.reauthenticateWithCredential(credential);

      // Re-authentication successful, update username and password
      await user.updateProfile({
        displayName: displayName,
      });

      await user.updatePassword(newPass);

      // Username and password updated successfully.

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
          <form onSubmit={handleSave} className="alert form-style">
            <div className="form-group">
              <label className="form-label">User Name</label>
              <input
                type="text"
                defaultValue={user?.displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="form-input"
              />
            </div>
            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                disabled
                className="form-input cursor-not-allowed"
              />{" "}
            </div>
            {/* Current Password for Verification */}
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input
                type="password"
                placeholder="Current Password"
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="form-input"
              />{" "}
            </div>
            {/* New Password */}
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input
                type="password"
                placeholder="New Password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />{" "}
            </div>
            <button type="submit">Save</button>
          </form>
          {editMode && message}
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
