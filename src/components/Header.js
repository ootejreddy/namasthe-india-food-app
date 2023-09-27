import { LOGO_URL } from "../utils/constants";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useNetworkStatus from "../utils/useNetworkStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnStatus, setbtnStatus] = useState("Login");
  const { loggedInUser } = useContext(UserContext);

  /*
   * we use selector hook to read cartSlice
   * subscribing to the store using a selector
   */
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between bg-green-100 shadow-lg mb-5">
      <div className="logo-container">
        <img className="w-60" src={LOGO_URL}></img>
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4">
            Online Status {useNetworkStatus() ? "✅" : "❌"}
          </li>
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4">
            <Link to="/contactus">Contact Us</Link>
          </li>
          <li className="px-4 font-bold text-xl">
            <Link to="/cart">Cart - ({cartItems.length} items)</Link>
          </li>
          <button
            className="login-btn"
            onClick={() => {
              btnStatus === "Login"
                ? setbtnStatus("Logout")
                : setbtnStatus("Login");
            }}
          >
            {btnStatus}
          </button>
          <li className="font-bold  px-4">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
