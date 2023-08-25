/*
 * this is a custom hook
 * The convention of custom hook is the function name should always start with use
 */

import { useState, useEffect } from "react";
import { MENU_URL } from "./constants";
/*
 * The below returns the individual restaurant information
 */
const useRestaurantMenu = (resId) => {
  const [menu, setMenu] = useState(null);
  useEffect(() => {
    fetchMenuData();
  }, []);
  const fetchMenuData = async () => {
    const data = await fetch(MENU_URL + resId);
    console.log(`The data is ${data}`);
    const json = await data.json();
    setMenu(json.data);
  };
  return menu;
};

export default useRestaurantMenu;
