import { useState, useEffect, SyntheticEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IMovie } from "../interfaces/movie";
import Movie from "./Movie";
import { IUser } from "../interfaces/user";
import axios from "axios";

function ShowMovie({ user }: { user: null | IUser }) {
  console.log("USER: ", user);
  const [movie, setMovie] = useState<IMovie | null>(null);
  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovie() {
      const response = await fetch(`/api/movies/${movieId}`);
      const movieData = await response.json();
      setMovie(movieData);
    }

    fetchMovie();
  }, [movieId]);

  async function deleteMovie(e: SyntheticEvent) {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/movies/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/movies");
    } catch (error: any) {
      console.log(error.response.data);
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-multiline">
          {movie && <Movie {...movie} />}
        </div>
        {movie && movie.user === user?._id && (
          <button onClick={deleteMovie} className="button is-danger">
            Delete
          </button>
        )}
      </div>
    </section>
  );
}

export default ShowMovie;