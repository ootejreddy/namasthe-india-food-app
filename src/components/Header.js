import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const [btnStatus, setbtnStatus] = useState("Login");
  return (
    <div className="flex justify-between bg-green-100 shadow-lg mb-5">
      <div className="logo-container">
        <img className="w-60" src={LOGO_URL}></img>
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4">Online Status ✅ </li>
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4">
            <Link to="/contactus">Contact Us</Link>
          </li>
          <li className="px-4">Cart</li>
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
        </ul>
      </div>
    </div>
  );
};

export default Header;
