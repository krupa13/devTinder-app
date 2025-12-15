import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";
import { useEffect } from "react";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await axios.post(BASE_URL + "/logout", { withCredentials: true })
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          💻 daisyUI
        </Link>
      </div>
      {user && (
        <div className="flex">
          <div className="form-control flex items-center">Welcome, {user.firstName}</div>
          <div className="dropdown dropdown-end mx-3">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="about photo" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3.5 w-62 p-4 shadow"
            >
              <li>
                <Link to="/profile">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
