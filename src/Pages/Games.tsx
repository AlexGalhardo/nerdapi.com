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

                    <div className="col-lg-5">
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <b
                                    id="game_igdb_link"
                                    className="fs-2 card-link text-decoration-none"
                                >
                                    <span id="game_title" className="fw-bold">
                                        {gameTitle}{" "}
                                    </span>
                                    (
                                    <span id="game_year_release" className="text-muted">
                                        {gameReleaseYear}
                                    </span>
                                    )
                                </b>
                            </div>

                            <p className="card-text" id="game_resume">
                                {gameSummary}
                            </p>


                        </div>
                    </div>

                    <div className="col-lg-4 mb-3">
                        <ul className="mt-3">
							<li className="">
								<b>Where To Buy:</b>
								<ul>
									<li><a href="https://metacritic.com" target="_blank">Buy on Amazon:</a></li>
									<li><a href="https://store.steampowered.com/" target="_blank">Steam Page</a></li>
								</ul>
							</li>
							<li className="">
								<b>Ratings:</b>
								<ul>
									<li className="">
										<a href="https://metacritic.com" target="_blank">Metacritic Rating:</a> ⭐<span id="game_igdb_rating">{gameIGDBRating}</span>
									</li>
									<li className="">
										<a href="https://igdb.com" target="_blank">IGDB Rating:</a> ⭐<span id="game_igdb_rating">{gameIGDBRating}</span>
									</li>
								</ul>
							</li>
							<li className="">
								<b>Developer:</b>
								<ul>
									<li><a href="https://store.steampowered.com/" target="_blank">{gameDeveloper}</a></li>
								</ul>
							</li>
							<li className="">
								<b>Publisher:</b>
								<ul>
									<li><a href="https://store.steampowered.com/" target="_blank">{gamePublisher}</a></li>
								</ul>
							</li>
							<li className="">
								<b>Genres:</b>
								<ul>
									<li><a href="https://store.steampowered.com/" target="_blank">Action</a></li>
									<li><a href="https://store.steampowered.com/" target="_blank">RPG</a></li>
								</ul>
							</li>
							<li className="">
								<b>Platforms available:</b>
								<ul>
									<li><a href="#" target="_blank">Windows PC</a></li>
									<li><a href="#" target="_blank">PlayStation 4</a></li>
								</ul>
							</li>
							<li className="">
								<b>HowLongToBeat:</b>
								<ul>
									<li><a href="https://store.steampowered.com/" target="_blank">Page</a></li>
									<li>History: 20 hours</li>
									<li>Completed: 35 hours</li>
								</ul>
							</li>
						</ul>
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
