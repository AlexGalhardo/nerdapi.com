import { CSSProperties, useCallback, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useGlobalState } from "../Context/GlobalStateContext";

export default function Games() {
    const { globalState } = useGlobalState();

    const [gameTitle, setGameTitle] = useState<string>();
    const [gameIGDBLink, setGameIGDBLink] = useState<string>();
    const [gameCover, setGameCover] = useState<string>();
    const [gameSummary, setGameSummary] = useState<string>();
    const [gameReleaseYear, setGameReleaseYear] = useState<number>();
    const [gameIGDBRating, setGameIGDBRating] = useState<number>();
    const [gameGenres, setGameGenres] = useState<string[]>([]);
    const [gamePlatforms, setGamePlatforms] = useState<string[]>([]);
    const [gameDeveloper, setGameDeveloper] = useState<string>();
    const [gamePublisher, setGamePublisher] = useState<string>();
    const [error, setError] = useState<string>();

    const recommendRandomGame = useCallback(async () => {
        const response = await fetch("https://api-games.alexgalhardo.com/games");
        const json = await response.json();
        const game = json[Math.floor(Math.random() * json?.length)];
        setGameTitle(game.title);
        setGameIGDBLink(game.igdb_url);
        setGameCover(game.cover);
        setGameSummary(game.summary);
        setGameReleaseYear(game.release_year);
        setGameIGDBRating(game.igdb_rating);
        setGameGenres(game.genres);
        setGamePlatforms(game.platforms);
        setGameDeveloper(game.developer);
        setGamePublisher(game.publisher);
    }, []);

    useEffect(() => {
        console.log("\n globalState na HOME é ===> ", globalState);

        fetch("https://api-games.alexgalhardo.com/games")
            .then((response) => response.json())
            .then((json) => {
                const game = json[Math.floor(Math.random() * json?.length)];
                setGameTitle(game.title);
                setGameIGDBLink(game.igdb_url);
                setGameCover(game.cover);
                setGameSummary(game.summary);
                setGameReleaseYear(game.release_year);
                setGameIGDBRating(game.igdb_rating);
                setGameGenres(game.genres);
                setGamePlatforms(game.platforms);
                setGameDeveloper(game.developer);
                setGamePublisher(game.publisher);
                // setLoading(false);
            })
            .catch((error) => {
                setError(error);
                // setLoading(false);
            });
    }, []);

    return (
        <>
            <Navbar />
            <div className="container" style={container}>
                <div className="row mt-5">
                    <div className="col-lg-3 text-center">
                        <img
                            id="game_image"
                            src={gameCover}
                            className="shadow mx-auto d-block w-100 image-fluid mb-3"
                            alt="game_image"
                        />
                        <button
                            className="button mt-3 w-80 btn btn-lg btn-outline-dark mb-3"
                            onClick={recommendRandomGame}
                        >
                            <i className="bi bi-play-fill"></i>
                            Recommend Other Game
                        </button>
                    </div>

                    <div className="col-lg-6">
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <a
                                    target="_blank"
                                    id="game_igdb_link"
                                    href={gameIGDBLink}
                                    className="fs-3 card-link text-decoration-none"
                                >
                                    <span id="game_title" className="fw-bold">
                                        {gameTitle}{" "}
                                    </span>
                                    (
                                    <span id="game_year_release" className="text-muted">
                                        {gameReleaseYear}
                                    </span>
                                    )
                                </a>

                                <h3 className="fw-bold text-warning">
                                    ⭐<span id="game_igdb_rating">{gameIGDBRating}</span>
                                </h3>
                            </div>

                            <p className="card-text" id="game_resume">
                                {gameSummary}
                            </p>

                            <ul className="mt-3">
                                <li className="">
                                    <b>Genres:</b> <span id="game_genres">{gameGenres.join(", ")}</span>
                                </li>
                                <li className="">
                                    <b>Platforms:</b> <span id="game_platforms">{gamePlatforms.join(", ")}</span>
                                </li>
                                <li className="">
                                    <b>Developer:</b> <span id="game_developer">{gameDeveloper}</span>
                                </li>
                                <li className="">
                                    <b>Publisher:</b> <span id="game_developer">{gamePublisher}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-3 mb-3">
                        <form className="mb-3" action="/searchGame" method="GET">
                            <input
                                className="shadow fs-5 form-control"
                                type="search"
                                placeholder="Search Game Title..."
                                aria-label="Search"
                                name="title"
                            />
                        </form>

                        <div className="list-group shadow-sm">
                            <a
                                href="/"
                                className="d-flex justify-content-between list-group-item list-group-item-action text-white bg-dark"
                            >
                                <i className="bi bi-controller"></i>
                                <span>Games</span>
                                <span>123</span>
                            </a>

                            <a
                                href="/books"
                                className="d-flex justify-content-between list-group-item list-group-item-action"
                            >
                                <i className="bi bi-book"></i>
                                <span>Books</span>
                                <span>10</span>
                            </a>

                            <a
                                href="/movies"
                                className="d-flex justify-content-between list-group-item list-group-item-action"
                            >
                                <i className="bi bi-camera-video"></i>
                                <span>Movies</span>
                                <span>30</span>
                            </a>

                            <a
                                href="/tvshows"
                                className="d-flex justify-content-between list-group-item list-group-item-action"
                            >
                                <i className="bi bi-tv"></i>
                                <span>TV Shows</span>
                                <span>20</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

const container: CSSProperties = {
    marginTop: "100px",
};
