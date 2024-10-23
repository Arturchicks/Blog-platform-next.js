import React, { useState } from "react";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

interface ICount {
  count: number;
}
const Favorites: React.FC<ICount> = ({ count }) => {
  return (
    <div className="flex gap-1 items-center pb-4">
      <Favorite />
      <span>{count}</span>
    </div>
  );
};
export default Favorites;
