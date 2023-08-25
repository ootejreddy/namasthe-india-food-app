import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const {
    name,
    cloudinaryImageId,
    cuisines,
    avgRating,
    costForTwo,
    deliveryTime,
  } = props.resData;

  return (
    <div className="m-4 p-4 w-[300px] bg-gray-200 rounded-xl hover:shadow-inner shadow-2xl">
      <img
        className="rounded-lg mb-3"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      ></img>
      <h3 className="font-bold">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating}</h4>
      <h4>{costForTwo}</h4>
      <h4>{deliveryTime}</h4>
    </div>
  );
};

//* higher order function for promoted lable
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-blue-500 text-white m-2 p-2 rounded-lg">
          promoted
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
