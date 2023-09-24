import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  if (!movieNames) return null;
  return (
    <div className="p-4 m-4 bg-black opacity-80">
      <div>
        {movieNames.map((movieName) => {
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[0]}
          />;
        })}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
