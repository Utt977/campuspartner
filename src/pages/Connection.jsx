import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../utils/Constant";

const Connection = () => {
  const [userList, setUserList] = useState([]);

  async function getConnectionsList() {
    try {
      const response = await fetch(BASE_URL + "/api/v1/user/connections", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();
      if (result.data.connectionList.length === 0) {
        toast.error("No Connection Found.");
      }
      setUserList(result?.data?.connectionList);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  useEffect(() => {
    getConnectionsList();
  }, []);

  return (
    <>
      <div className="w-full min-h-[85vh] bg-gray-100 p-4 md:p-8">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Your Connections
        </h2>
        {userList.length === 0 ? (
          <p className="text-center font-medium text-lg text-gray-600 mt-10">
            Connection List is loading, please wait...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userList.map((user, index) => (
              <div
                className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center gap-4"
                key={index}
              >
                <img
                  src={user.photoURL}
                  alt={`${user.firstName}'s avatar`}
                  className="w-32 h-32 object-cover rounded-full border border-gray-200"
                />
                <div className="text-center">
                  <p className="text-xl font-medium text-gray-800">
                    {user.firstName + " " + user.lastName}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Age:</span> {user.age}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Gender:</span>{" "}
                    {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
                  </p>
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

export default Connection;
