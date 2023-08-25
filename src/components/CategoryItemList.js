import { CDN_URL } from "../utils/constants";

const CategoryItemList = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card?.info?.id}
          className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between"
        >
          <div className="w-9/12">
            <div className="py-3">
              <span className="font-semibold">{item.card?.info?.name}</span>
              <span>
                - ₹
                {item.card?.info?.price
                  ? item.card?.info?.price / 100
                  : item.card?.info?.defaultPrice / 100}
              </span>
            </div>
            <p className="text-s">{item.card?.info?.description}</p>
          </div>
          <div className="p-4 w-3/12">
            <div className="absolute">
              <button className="p-3 bg-orange-600 text-white shadow-lg rounded-md mx-16">
                add +
              </button>
            </div>
            <div>
              <img src={CDN_URL + item.card?.info?.imageId}></img>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryItemList;
