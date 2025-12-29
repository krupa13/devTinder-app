import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { removeUsersFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoURL, about, age, gender } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUsersFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card bg-slate-800/80 backdrop-blur-md shadow-2xl hover:shadow-cyan-500/50 hover:shadow-3xl transition-all duration-300 transform hover:scale-105 w-96 border border-slate-700/50">
      <figure className="px-6 pt-6">
        <div className="w-80 h-80 rounded-2xl overflow-hidden border-2 border-cyan-400/30 shadow-lg shadow-cyan-500/20">
          <img
            src={photoURL}
            alt="User Photo"
            className="w-full h-full object-cover"
          />
        </div>
      </figure>
      <div className="card-body items-center text-center bg-gradient-to-b from-slate-800/80 to-slate-900/60 pt-6">
        <h2 className="card-title text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          {firstName + " " + lastName}
        </h2>
        {age && gender && (
          <p className="text-sm px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-full font-semibold border border-cyan-400/30">
            {age + " years, " + gender}
          </p>
        )}
        <p className="text-gray-300 py-4 text-sm leading-relaxed">{about}</p>
        <div className="card-actions justify-center gap-4 mt-6 w-full">
          <button
            className="btn btn-outline btn-error flex-1 hover:bg-red-600 hover:border-red-600 text-red-400 border-red-400/50"
            onClick={() => handleSendRequest("ignored", user._id)}
          >
            ✕ Ignore
          </button>
          <button
            className="btn btn-success flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 border-0 text-white hover:shadow-lg hover:shadow-cyan-500/50"
            onClick={() => handleSendRequest("interested", user._id)}
          >
            ♥ Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
