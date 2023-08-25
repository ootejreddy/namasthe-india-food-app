import { useParams } from "react-router-dom";
import { LOGO_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const [showIndex, setShowIndex] = useState(null);
  //* The useParams will give resId as an object and we are destructuring the json.
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  if (resInfo === null) {
    // console.log(`The resInfo is: ${resInfo}`);
    return <Shimmer />;
  }
  const { name, id, costForTwoMessage, avgRating, uniqueId, cuisines } =
    resInfo?.cards[0]?.card?.card?.info;
  const { itemCards } =
    resInfo.cards[2].groupedCard.cardGroupMap.REGULAR?.cards[1].card?.card;
  // console.log(
  //   "the dataaa",
  //   resInfo.cards[2].groupedCard.cardGroupMap.REGULAR?.cards
  // );
  const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  // console.log("The categories are", categories);
  // console.log(`The itemCards are: ${itemCards}`);
  return (
    <div className="text-center">
      <h1 className="text-3xl text-center font-bold my-6">{name}</h1>
      <p className="font-bold text-center my-6 text-xl">
        {cuisines.join(",")} - {costForTwoMessage}
      </p>
      <div>
        {categories.map((item, index) => (
          //* this a controlled component
          <RestaurantCategory
            key={item.card?.card?.title}
            data={item.card?.card}
            showItems={index === showIndex && true}
            setShowIndex={() => {
              setShowIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
