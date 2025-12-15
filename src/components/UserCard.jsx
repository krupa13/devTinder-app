import React from "react";

const UserCard = ({user}) => {
  console.log(user);

  const { firstName, lastName, photoURL, about, age, gender} = user;

  return (
      <div className="card bg-white shadow-2xl hover:shadow-3xl transition-all duration-300 w-96 border border-gray-200">
        <figure className="px-6 pt-6">
          <div className="w-64 h-64 rounded-xl overflow-hidden border-4 border-gray-100 shadow-lg">
            <img
              src={photoURL}
              alt="User Photo"
              className="w-full h-full object-cover"
            />
          </div>
        </figure>
        <div className="card-body items-center text-center bg-gradient-to-b from-white to-gray-50">
          <h2 className="card-title text-2xl font-bold text-gray-800">{firstName + " " + lastName}</h2>
          {age && gender && <p className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">{age + ", " + gender}</p>}
          <p className="text-gray-600 py-3">{about}</p>
          <div className="card-actions justify-center gap-4 mt-4">
            <button className="btn btn-outline btn-error">Ignore</button>
            <button className="btn btn-success">Send Request</button>
          </div>
        </div>
      </div>
  );
};

export default UserCard;
