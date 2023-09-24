import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_Options } from "../utils/constants";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = () => {
  //Fetch data from TMDB API and update store
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);
  const getUpcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      API_Options
    );
    const json = await data.json();

    dispatch(addUpcomingMovies(json.results));
  };

  useEffect(() => {
    !upcomingMovies && getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
