import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState("");
  const getMovie = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setLoading(false);
    setMovie(json.data.movie);
    // console.log(json);
  }, [id]);
  useEffect(() => {
    getMovie();
  }, [getMovie]);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>Detail</h1>
          <h2>{movie.title}</h2>
          <img src={movie.medium_cover_image} alt={movie.title} />
          <p>rating: {movie.rating}</p>
          <p>runtime: {movie.runtime}m</p>
          <p>{movie.description_full}</p>
          <p>
            <Link to={`${process.env.PUBLIC_URL}/`}>Home</Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default Detail;
