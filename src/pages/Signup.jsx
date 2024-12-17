import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../utils/Constant";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  async function createNewUser() {
    try {
      if (!email || !password || !firstName || !age || !gender) {
        toast.error("Fill all the required fields");
        return;
      }

      if (age < 18 || age > 60) {
        toast.error("Age must be between 18 to 60");
        return;
      }

      const response = await fetch(BASE_URL + "/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          age,
          gender,
          photoURL,
        }),
      });
      const result = await response.json();

      if (result.success) {
        navigate("/");
      } else {
        toast.error(result.error);
        return;
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-md w-full max-w-lg p-6 sm:p-8 md:p-10">
        <h1 className="font-bold text-2xl sm:text-3xl text-gray-800 text-center mb-6">
          Signup to Dev Tinder
        </h1>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="firstName"
              className="text-sm sm:text-base text-gray-700 mb-1"
            >
              First Name:*
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-300"
              placeholder="Enter your first name"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="lastName"
              className="text-sm sm:text-base text-gray-700 mb-1"
            >
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-300"
              placeholder="Enter your last name"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm sm:text-base text-gray-700 mb-1"
            >
              Email:*
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-300"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm sm:text-base text-gray-700 mb-1"
            >
              Password:*
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-300"
                placeholder="Enter your password"
              />
              <i
                className={`fa-solid ${
                  passwordVisible ? "fa-eye" : "fa-eye-slash"
                } absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer`}
                onClick={() => setPasswordVisible(!passwordVisible)}
              ></i>
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="age"
              className="text-sm sm:text-base text-gray-700 mb-1"
            >
              Age:*
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-300"
              placeholder="Enter your age"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="gender"
              className="text-sm sm:text-base text-gray-700 mb-1"
            >
              Gender:*
            </label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="male"
                  value="male"
                  name="gender"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="male" className="ml-2 text-sm text-gray-700">
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="female"
                  value="female"
                  name="gender"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="female" className="ml-2 text-sm text-gray-700">
                  Female
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="others"
                  value="others"
                  name="gender"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="others" className="ml-2 text-sm text-gray-700">
                  Others
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="photoURL"
              className="text-sm sm:text-base text-gray-700 mb-1"
            >
              Photo URL:
            </label>
            <input
              type="url"
              id="photoURL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-300"
              placeholder="Enter your profile photo URL"
            />
          </div>
        </div>
        <button
          onClick={createNewUser}
          className="w-full mt-6 bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition duration-300"
        >
          Signup
        </button>
        <Link
          to="/login"
          className="block text-center text-sm mt-4 text-gray-700 hover:underline"
        >
          Already have an account? Login here
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
