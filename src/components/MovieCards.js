import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCards = ({ posterPath }) => {
  return (
    <div className="w-48 pr-4">
      <img alt="posterpath" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};

export default MovieCards;
