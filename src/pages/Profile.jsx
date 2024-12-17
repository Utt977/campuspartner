import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../utils/Constant";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  async function getUserData() {
    try {
      const response = await fetch(BASE_URL + "/api/v1/profile/view", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      setUserData(result?.data?.user);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  async function handleEditUserProfile() {
    try {
      const response = await fetch(BASE_URL + "/api/v1/profile/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          firstName,
          lastName,
          age: String(age),
          photoURL,
        }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Profile Updated Successfully");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setAge(userData.age);
      setPhotoURL(userData.photoURL);
    }
  }, [userData]);

  return (
    <>
      <div className="w-full h-screen bg-gray-100">
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full h-full gap-8 p-5 lg:p-10">
          {userData === null ? (
            <p className="text-yellow-600 text-xl font-medium">
              Loading User Profile Data...
            </p>
          ) : (
            <div className="flex flex-col lg:flex-row w-full lg:w-3/4 bg-white shadow-md rounded-lg p-6 lg:p-10 gap-6">
              {/* Form Section */}
              <div className="flex flex-col gap-6 w-full lg:w-1/2">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Edit Profile
                </h2>
                <div className="flex flex-col gap-4">
                  <label htmlFor="firstName" className="text-lg font-medium">
                    First Name:
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <label htmlFor="lastName" className="text-lg font-medium">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Enter your last name"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <label htmlFor="age" className="text-lg font-medium">
                    Age:
                  </label>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Enter your age"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <label htmlFor="photoURL" className="text-lg font-medium">
                    Photo URL:
                  </label>
                  <input
                    type="url"
                    name="photoURL"
                    id="photoURL"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Enter your photo URL"
                  />
                </div>
                <button
                  onClick={handleEditUserProfile}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200"
                >
                  Save Changes
                </button>
              </div>

              {/* Image Section */}
              <div className="flex justify-center items-center w-full lg:w-1/2">
                <img
                  src={userData.photoURL}
                  alt="User"
                  className="w-full max-w-xs lg:max-w-md rounded-md shadow-lg object-contain"
                />
              </div>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Profile;
