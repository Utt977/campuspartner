import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { userContext } from "../context/UserContext";
import { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../utils/Constant";

const Login = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { handleIsLoggedInUser, handleLoggedInUser } = useContext(userContext);

  async function loginUser() {
    try {
      if (!email || !password) {
        toast.error("Fill all the fields.");
        return;
      }

      const response = await fetch(BASE_URL + "/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });
      const result = await response.json();

      if (!result.success) {
        toast.error(result.error);
      }
      if (result.success) {
        handleLoggedInUser(result?.data?.responseUser);
        handleIsLoggedInUser(true);
        navigate("/");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  return (
    <div className="w-full min-h-[85vh] flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 md:p-8 lg:p-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6">
          Login to Dev Tinder
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm md:text-base text-gray-600 mb-1"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base focus:ring focus:ring-yellow-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col relative">
            <label
              htmlFor="password"
              className="text-sm md:text-base text-gray-600 mb-1"
            >
              Password:
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base focus:ring focus:ring-yellow-500 focus:outline-none"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-4 top-[calc(50%-0.75rem)] text-gray-600"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              <i
                className={`fa-solid ${
                  passwordVisible ? "fa-eye" : "fa-eye-slash"
                }`}
              />
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-medium text-sm md:text-base py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
            onClick={loginUser}
          >
            Login to Dev Tinder
          </button>
          <Link
            to="/signup"
            className="text-sm md:text-base text-center text-yellow-500 hover:text-yellow-600 font-medium"
          >
            Create an account
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
