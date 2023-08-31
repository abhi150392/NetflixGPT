import useNpwPlayingMovies from "../hooks/useNpwPlayingMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  useNpwPlayingMovies();
  return (
    <div>
      <Header />
      {/* 
        - Main Container
          - Video Background
          - Video Title
        - Secondary Container
          - MovieList * n
            - card * n      
      */}
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
