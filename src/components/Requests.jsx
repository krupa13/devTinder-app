import React, { useEffect } from "react";
import { BASE_URL } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestsSlice";
import axios from "axios";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchReuqests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReuqests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h1>No Request Found</h1>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="flex justify-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Connection Requests
        </h1>
      </div>

      <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
        {requests.map((request, index) => {
          const { firstName, lastName, photoURL, age, gender, about } =
            request.fromUserId;

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
              <div className="card-actions justify-center gap-4 mb-3">
                <button className="btn btn-outline btn-error">Reject</button>
                <button className="btn btn-success">Accept</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
