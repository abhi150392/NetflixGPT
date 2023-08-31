import useNpwPlayingMovies from "../hooks/useNpwPlayingMovies";
import Header from "./Header";

const Browse = () => {
  useNpwPlayingMovies();
  return (
    <div>
      <Header />
    </div>
  );
};

export default Browse;
