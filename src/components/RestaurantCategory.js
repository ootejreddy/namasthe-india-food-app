import { useState } from "react";

import CategoryItemList from "./CategoryItemList";
const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const handleClick = () => {
    setShowIndex(null);
  };
  return (
    <div>
      <div className=" w-6/12 bg-gray-50 shadow-lg mx-auto my-4 p-6">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-bold">
            {data.title} ({data.itemCards?.length})
          </span>
          <span>⬇️</span>
        </div>
        {showItems && <CategoryItemList items={data.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
