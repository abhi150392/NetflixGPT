import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);

  return (
    <div className="p-4 m-4 bg-black opacity-80">
      <div>
        {movieNames?.map((movieName, index) => {
          return (
            <MovieList
              key={movieName}
              title={movieName}
              movies={movieResults[index]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
