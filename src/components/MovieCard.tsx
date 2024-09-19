
import {IMovie} from "../interfaces/movie"


export default function MovieCard(movie:IMovie){
return <p>{movie.name}</p>
}