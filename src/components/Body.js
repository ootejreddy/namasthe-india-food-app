import restuarantData from "../utils/mockData";
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { RES_LIST_URL } from "../utils/constants";

const Body = () => {
  const [resList, setResList] = useState([]);
  console.log(`type of resList is ${typeof resList}`);
  //* we are using another state variable because not loose the main state variable data
  const [filteredResList, setfilteredResList] = useState([]);
  const [searchText, setsearchText] = useState("");
  useEffect(() => {
    console.log("useEffect called");
    fetchData();
  }, []);

  const fetchData = async () => {
    /* 
    * Here we are using swiggy API
    ! This API address might change in future need to update the address if necessary
    */
    const data = await fetch(RES_LIST_URL);

    console.log(`The  data is ${JSON.stringify(data)}`);
    //! The json data changes at anytime make sure you recheck the json data if any error occurs
    const json = await data.json();

    console.log(` The json data is: 
      ${json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants}`);

    //* optional chaining
    setResList(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setfilteredResList(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
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
          <label htmlFor="Search" class="sr-only">
            {" "}
            Search{" "}
          </label>
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
      </div>
      <div className="flex flex-wrap">
        {filteredResList.map((restaurant) => {
          return (
            <Link
              key={restaurant?.info.id}
              to={`/restaurants/${restaurant?.info.id}`}
            >
              <RestaurantCard resData={restaurant?.info} />{" "}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
