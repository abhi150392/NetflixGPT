import React, { useRef } from "react";
import { lang } from "../utils/languageConstansts";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_Options } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();

  //Search movie in TmBD database
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "include_adult=false&language=en-US&page=1",
      API_Options
    );
    const json = await data.json();
    return json.results;
  };
  const handleClick = async () => {
    console.log(searchText.current.value);
    //Make an call to GPT AI and get movie recomandations

    const gptQuery =
      "Act as a Movie Recommendation System and suggest some movies for the query:" +
      searchText.current.value +
      ". Only give me names of top 5 movies, comma seperated like the example result. Example Result : MEG, Gadar, KGF, RRR, Ghost.";

    const movieResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    console.log(movieResults.choices[0]?.message?.content);
    const gptMovies = movieResults.choices[0]?.message?.content.split(",");

    // for each movie we will search in TMDB API - returns promise object
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    //Gives an array when all promises are resolved - to get data from promise Array
    const tmdbSearchResults = await Promise.all(promiseArray);

    dispatch(
      addGptMovieResult({
        movieNames: gptMovies,
        movieResults: tmdbSearchResults,
      })
    );
  };
  const langKey = useSelector((store) => store.config.lang);
  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="p-4 m-4 col-span-9"
          type="text"
          placeholder={lang[langKey].searchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
