import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_Options } from "../utils/constants";
import { trailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = () => {
  const dispatch = useDispatch();

  //to get a trailer
  const getMovieTrailer = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/926393/videos?language=en-US",
      API_Options
    );
    const json = await data.json();

    //get an object from array with type trailer
    const filteredData = json.results.filter(
      (movie) => movie.type === "Trailer"
    );
    const trailer = filteredData.length ? filteredData[0] : json.results[0];
    console.log(trailer);
    dispatch(trailerVideo(trailer));
  };

  useEffect(() => {
    getMovieTrailer();
  }, []);
};

export default useMovieTrailer;
