import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/Constants";
import axios from "axios";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
            No Connections Found
          </h1>
          <p className="text-gray-400 text-lg">
            You don't have any connections yet.
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="flex justify-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Connections
        </h1>
      </div>

      <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
        {connections.map((connection, index) => {
          const { _id, firstName, lastName, photoURL, age, gender, about } =
            connection;

          return (
            <div
              key={index}
              className="card bg-slate-800/80 backdrop-blur-md shadow-2xl border border-slate-700/50 w-64 hover:shadow-cyan-500/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <figure className="px-8 pt-8">
                <img
                  src={photoURL}
                  alt={`${firstName} ${lastName}`}
                  className="rounded-full h-40 w-40 object-cover"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-lg text-white justify-center">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p className="text-center text-xs text-cyan-300">
                    {age} years old, {gender}
                  </p>
                )}
                <p className="text-center text-gray-300 text-xs line-clamp-2">
                  {about}
                </p>
              </div>
              <div className="flex justify-center pb-4">
                <Link to={"/chat/" + _id} className="w-full flex justify-center">
                  <button className="btn btn-primary btn-md w-5/6 rounded-full font-semibold shadow-lg bg-gradient-to-r from-cyan-400 to-blue-500 border-0 hover:from-blue-500 hover:to-cyan-400 transition-all duration-200 flex items-center gap-2 justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v6a2.25 2.25 0 01-2.25 2.25h-5.25l-3.75 3v-3H4.5A2.25 2.25 0 012.25 12.75v-6A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25z"
                      />
                    </svg>
                    Chat
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
