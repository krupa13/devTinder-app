import { useState } from "react";
import loginImage from "../assets/login-access.jpg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";
import { toast } from "react-toastify";

const Login = () => {
  const [emailId, setEmailId] = useState("krupa@gmail.com");
  const [password, setPassword] = useState("Krupa@1234");
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
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data || "Login failed");
    }
  };

  return (
    <div className="flex justify-center my-12">
      <div className="card card-side bg-base-300 shadow-sm">
        <figure className="w-80 h-80">
          <img
            src={loginImage}
            alt="Login"
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body w-90">
          <h2 className="card-title text-2xl justify-center">Login</h2>
          <div>
            <fieldset className="fieldset mb-1">
              <legend className="fieldset-legend text-md">
                Email ID
              </legend>
              <input
                type="text"
                value={emailId}
                className="input"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset mb-1">
              <legend className="fieldset-legend text-md">
                Password
              </legend>
              <input
                type="text"
                value={password}
                className="input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
