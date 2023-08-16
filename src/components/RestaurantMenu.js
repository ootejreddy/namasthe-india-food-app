import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LOGO_URL, MENU_URL } from "../utils/constants";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const [resInfo, setresInfo] = useState(null);
  const { resId } = useParams();
  useEffect(() => {
    fetchMenu();
  }, []);

  /*
   *The below has the individual restaurant information
   */
  const fetchMenu = async () => {
    console.log(MENU_URL + resId);
    try {
      const data = await fetch(MENU_URL + resId);
      const jsonData = await data.json();
      // console.log(`The json data is ${jsonData}`);
      console.log(jsonData.data);
      setresInfo(jsonData.data);
    } catch (err) {
      console.log(`The error is: ${err}`);
    }
  };

  if (resInfo === null) {
    return <Shimmer />;
  }

  const { name, id, costForTwoMessage, avgRating, uniqueId, cuisines } =
    resInfo?.cards[0]?.card?.card?.info;

  const { itemCards } =
    resInfo.cards[2].groupedCard.cardGroupMap.REGULAR?.cards[1].card?.card;

  console.log(`The itemCards are: ${itemCards}`);

  return (
    <div>
      <h1 className="text-3xl">{name}</h1>
      <h2>{costForTwoMessage}</h2>
      <ul>cusines: {cuisines.join(", ")}</ul>
      <h2 className="text-3xl">Menu Items:</h2>
      <ul>
        {itemCards &&
          itemCards.map((item) => (
            <li key={item?.card?.info?.id}>
              {item?.card?.info?.name} {" Rs - "}
              {item?.card?.info?.price / 100 ||
                item?.card?.info?.defaultPrice / 100}{" "}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
