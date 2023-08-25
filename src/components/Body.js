import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { RES_LIST_URL } from "../utils/constants";
import axios from "axios";
import useNetworkStatus from "../utils/useNetworkStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  const [resList, setResList] = useState([]);

  const { loggedInUser, setUserName } = useContext(UserContext);
  // console.log(`type of resList is ${typeof resList}`);

  //* we are using another state variable because not loose the main state variable data
  const [filteredResList, setfilteredResList] = useState([]);
  const [searchText, setsearchText] = useState("");
  const ResCardPromoted = withPromotedLabel(RestaurantCard);
  useEffect(() => {
    console.log("useEffect called");
    fetchData();
  }, []);

  const fetchData = async () => {
    /* 
    * Here we are using swiggy API
    ! This API address might change in future need to update the address if necessary
    */
    const response = await axios.get(RES_LIST_URL);

    console.log(`The  response is ${response.data}`);
    //! The json data changes at anytime make sure you recheck the json data if any error occurs

    // console.log(` The json data is:
    //   ${JSON.stringify(response.data)}`);

    //* optional chaining
    setResList(response.data);
    setfilteredResList(response.data);
    console.log(
      `both setResList and setfilteredResList are triggered because of useEffectHook`
    );
  };

  /*
   * we are writing this condition for the react to render once we get the data from swiggy API
   * also known as conditional rendering
   * here we are using shimmer UI
   * To create a good user experience we are creating dummy cards until the actual data renders from the api call
   */

  const onlineStatus = useNetworkStatus();
  if (onlineStatus === false) {
    return <h1>you're offline ❌ please check your connection</h1>;
  }

  if (resList.length === 0) {
    return <Shimmer />;
  }

  return (
    <div>
      <div className="flex items-center">
        {
          //* comment here
          //* Implementation of search functionality
        }
        <div className="m-4 p-4 ">
          <label htmlFor="Search"> Search </label>
          <input
            // className="border border-solid border-black rounded-lg h-10 w-80"
            id="Search"
            className=" border relative border-solid w-80 rounded-lg border-gray-400 py-2.5 pe-10 shadow-sm sm:text-sm pl-4"
            type="text"
            value={searchText}
            placeholder="Search for..."
            onChange={(event) => {
              setsearchText(event.target.value);
            }}
          ></input>
          <button
            className="m-4 px-4 py-2 bg-blue-200 rounded-md hover:shadow-lg focus:outline-none focus:ring"
            onClick={() => {
              const filteredRes = resList.filter((res) => {
                return res.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              });
              console.log(filteredRes);
              if (filteredRes.length > 0) {
                setfilteredResList(filteredRes);
              }
            }}
          >
            Search
          </button>
          {
            //* search functionality ends with the below closing div
          }
        </div>
        <div>
          <button
            className="m-4 px-4 py-2 bg-red-200 rounded-md hover:shadow-lg"
            onClick={() => {
              const resData = resList.filter((res) => res.info.avgRating > 4.2);
              setfilteredResList(resData);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>

        <div>
          <label htmlFor="userName">userName:</label>
          <input
            type="text"
            id="userName"
            value={loggedInUser}
            className=" border relative border-solid w-80 rounded-lg border-gray-400 py-2.5 pe-10 shadow-sm sm:text-sm pl-4 ml-3"
            onChange={(event) => setUserName(event.target.value)}
          ></input>
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredResList.map((restaurant) => {
          return (
            <Link
              key={restaurant?.info.id}
              to={`/restaurants/${restaurant?.info?.id}`}
            >
              {restaurant?.info?.promoted ? (
                <ResCardPromoted resData={restaurant.info} />
              ) : (
                <RestaurantCard resData={restaurant.info} />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
