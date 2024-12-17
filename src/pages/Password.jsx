import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../utils/Constant";

const Password = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function handleUpdatePassword() {
    try {
      if (!currentPassword || !newPassword) {
        toast.error("Fill all the fields.");
        return;
      }

      const response = await fetch(BASE_URL + "/api/v1/profile/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword: currentPassword,
          newPassword: newPassword,
        }),
        credentials: "include",
      });
      const result = await response.json();
      if (!result.success) {
        toast.error(result.error);
      } else {
        toast.success("Password Updated Successfully");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  return (
    <div className="flex justify-center items-center h-[85vh] bg-gray-100 px-4 md:px-8 lg:px-16">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Update Password
        </h1>
        <div className="mb-4">
          <label
            htmlFor="oldPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Current Password
          </label>
          <div className="relative">
            <input
              type={currentPasswordVisible ? "text" : "password"}
              name="oldPassword"
              id="oldPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900"
              placeholder="Enter your current password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              onClick={() => setCurrentPasswordVisible(!currentPasswordVisible)}
            >
              <i
                className={`fa-solid ${
                  currentPasswordVisible ? "fa-eye" : "fa-eye-slash"
                }`}
              ></i>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Password
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900"
              placeholder="Enter your new password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              <i
                className={`fa-solid ${
                  passwordVisible ? "fa-eye" : "fa-eye-slash"
                }`}
              ></i>
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleUpdatePassword}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          Change Password
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Password;
