import { useState } from "react";
import loginImage from "../assets/login-access.jpg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { resetFeed } from "../utils/feedSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";
import { toast } from "react-toastify";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!emailId) {
      toast.error("Email ID is required");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        {
          withCredentials: true,
        }
      );
      console.log("Login response:", res);
      dispatch(addUser(res?.data));
      dispatch(resetFeed());
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data || "Login failed");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      toast.success("Sign Up Successfull!");
      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="flex w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Image Section */}
        <figure className="w-1/2 hidden md:block">
          <img
            src={loginImage}
            alt="Login"
            className="w-full h-full object-cover"
          />
        </figure>
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              isLoginForm ? handleLogin() : handleSignUp();
            }}
          >
            {!isLoginForm && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={emailId}
                className="input input-bordered w-full"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full mt-4"
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </form>

          {/* Toggle Links */}
          <div className="mt-6 text-center border-t pt-6">
            {isLoginForm ? (
              <div
                className="cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => setIsLoginForm(false)}
              >
                <p className="text-gray-600 text-sm">New User?</p>
                <span className="text-blue-600 font-semibold hover:underline">
                  Sign Up Here
                </span>
              </div>
            ) : (
              <div
                className="cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => setIsLoginForm(true)}
              >
                <p className="text-gray-600 text-sm">Existing User?</p>
                <span className="text-blue-600 font-semibold hover:underline">
                  Login Here
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
