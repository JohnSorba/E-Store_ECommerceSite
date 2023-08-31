import {
  getAuth,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";

function ProfileEdit({
  newEmail,
  newPassword,
  newUserProfile,
  setEmail,
  setPassword,
  setUserProfile,
}) {
  const auth = getAuth();
  const user = auth.currentUser;

  const handleInputChange = (e) => {
    console.log("profile update");

    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

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

  return (
    <div>
      {" "}
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
      </div>
    </div>
  );
}

export default ProfileEdit;
