import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../utils/Constant";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState(0);

  async function getUser() {
    try {
      const response = await fetch(BASE_URL + "/api/v1/user/feed", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();

      if (result.success) {
        setData(result?.data?.userList);
      } else {
        navigate("/login");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  async function handleIgnored(userId) {
    try {
      const response = await fetch(
        BASE_URL + "/api/v1/request/send/ignored/" + userId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const result = await response.json();
      if (result.success) {
        toast.success("Profile Ignored");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  async function handleInterested(userId) {
    try {
      const response = await fetch(
        BASE_URL + "/api/v1/request/send/interested/" + userId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const result = await response.json();
      if (result.success) {
        toast.success("Sended Connection Request.");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  function handleNextUser() {
    setCurrentUser((prev) => prev + 1);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full h-[85vh] bg-gray-100 flex justify-center items-center">
      <div className="flex justify-center items-center h-full relative w-full px-4">
        {currentUser >= data.length ? (
          <p className="text-yellow-500 text-lg font-semibold">
            No More Users Found.
          </p>
        ) : (
          <div
            className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto"
            key={data[currentUser]._id}
          >
            <img
              src={data[currentUser].photoURL}
              alt="User"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {data[currentUser].firstName + " " + data[currentUser].lastName}
              </h2>
              <p className="text-sm text-gray-600">
                Age: {data[currentUser].age}
              </p>
              <p className="text-sm text-gray-600">
                Gender: {data[currentUser].gender}
              </p>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-4 border-t">
              <button
                className="bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-6 rounded-md transition"
                onClick={() => {
                  handleIgnored(data[currentUser]._id);
                  handleNextUser();
                }}
              >
                Ignore
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white text-sm py-2 px-6 rounded-md transition"
                onClick={() => {
                  handleInterested(data[currentUser]._id);
                  handleNextUser();
                }}
              >
                Interested
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
