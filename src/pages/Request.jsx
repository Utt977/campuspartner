import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../utils/Constant";

const Request = () => {
  const [userList, setUserList] = useState([]);

  async function getConnectionsList() {
    try {
      const response = await fetch(BASE_URL + "/api/v1/user/requests", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();
      if (!result.success) {
        toast.error("No Request Found.");
      }
      setUserList(result?.data?.requestList || []);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  useEffect(() => {
    getConnectionsList();
  }, []);

  async function handleAccepted(requestId) {
    try {
      const response = await fetch(
        BASE_URL + "/api/v1/request/review/accepted/" + requestId,
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
        toast.success("Accepted the request.");
        setUserList(userList.filter((user) => user._id !== requestId));
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  async function handleRejected(requestId) {
    try {
      const response = await fetch(
        BASE_URL + "/api/v1/request/review/rejected/" + requestId,
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
        toast.success("Rejected the request.");
        setUserList(userList.filter((user) => user._id !== requestId));
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  return (
    <>
      <div className="w-full min-h-[85vh] bg-gray-100 p-4 md:p-8">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Connection Requests
        </h2>
        {userList.length === 0 ? (
          <p className="text-center text-lg text-gray-600 mt-10">
            Request List is loading, please wait...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userList.map((user, index) => (
              <div
                className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center gap-4"
                key={index}
              >
                <img
                  src={user.fromUserId.photoURL}
                  alt={`${user.fromUserId.firstName}'s avatar`}
                  className="w-32 h-32 object-cover rounded-full border border-gray-300"
                />
                <div className="text-center">
                  <p className="text-xl font-medium text-gray-800">
                    {user.fromUserId.firstName + " " + user.fromUserId.lastName}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Age:</span>{" "}
                    {user.fromUserId.age}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Gender:</span>{" "}
                    {user.fromUserId.gender.charAt(0).toUpperCase() +
                      user.fromUserId.gender.slice(1)}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                    onClick={() => {
                      handleRejected(user._id);
                    }}
                  >
                    Reject
                  </button>
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                    onClick={() => {
                      handleAccepted(user._id);
                    }}
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Request;
