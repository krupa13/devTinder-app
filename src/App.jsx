import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import axios from "axios";
import { BASE_URL } from "./utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(store => store.user);

  const fetchUserData = async () => {
    if(userData) return; //If user data already exists, no need to fetch again
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data))
    } catch (err) {
      if(err.status === 401) {
        navigate("/login");
      }
      console.error("Error fetching user data: ", err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar/>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
