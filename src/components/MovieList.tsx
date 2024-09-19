import { useState, useEffect } from "react";
import { IMovie } from "../interfaces/movie";
import Movie from "./Movie";

type Movies = null | Array<IMovie>;

function MoviesList() {
  const [movies, setMovies] = useState<Movies>(null);

  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch("/api/movies");
      const moviesData = await response.json();
      setMovies(moviesData);
    }
    fetchMovies();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-multiline">
          {movies?.map((movie) => (
            <Movie {...movie} key={movie._id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MoviesList;