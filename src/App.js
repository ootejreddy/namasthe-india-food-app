import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import { useContext, useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";

const AppLayout = () => {
  const [userName, setUserName] = useState("Hashirama Senju");
  //* mock user authentication

  useEffect(() => {
    const data = { name: "sai ootej reddy" };
  }, []);

  // const { loggedInUser } = useContext(UserContext);
  return (
    <div className="app">
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <Header />
        {/** The outlet is replaced with the children path
         * If the user enters /about then outlet is replace with about component, so on..
         */}
        <Outlet />
      </UserContext.Provider>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Body /> },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contactus",
        element: <ContactUs />,
      },
      {
        path: `/restaurants/:resId`,
        element: <RestaurantMenu />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
