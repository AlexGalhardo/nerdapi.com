import { CSSProperties, useCallback, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useLocation } from "react-router-dom";
import ErrorAlertMessage from "../Components/Alerts/ErrorAlertMessage";
import SuccessAlertMessage from "../Components/Alerts/SuccessAlertMessage";
import GamesRepository, { Game } from "../Repositories/Games.repository";
import Head from "../Components/Head";

export default function Games() {
    const [error, setError] = useState<string | null>();
    const [game, setGame] = useState<Game | null>(null);
    const [games, setGames] = useState<Game[] | null>(null);
    const [foundMoreThanOne, setFoundMoreThanOne] = useState<boolean>(false);
    const [totalGamesFound, setTogalGamesFound] = useState<number | null>(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const recommendRandomGame = useCallback(async () => {
        setError("");
		const randomGame = new GamesRepository().getRandom()

        setGame({
            id: randomGame.id,
            title: randomGame.title,
            cover_image: randomGame.cover_image,
            summary: randomGame.summary,
            release: {
                year: randomGame.release.year,
                date: randomGame.release.date,
            },
            igdb: {
                url: randomGame.igdb.url,
                rating: randomGame.igdb.rating,
            },
            metacritic: {
                url: randomGame.metacritic.url,
                rating: randomGame.metacritic.rating,
            },
            where_to_buy: randomGame.where_to_buy,
            developer: randomGame.developer,
            publisher: randomGame.publisher,
            platforms_available: randomGame.platforms_available,
            genres: randomGame.genres,
            how_long_to_beat: {
                url: randomGame.how_long_to_beat.url,
                main_story: {
                    average: randomGame.how_long_to_beat.main_story.average,
                },
                completionist: {
                    average: randomGame.how_long_to_beat.completionist.average,
                },
            },
            created_at: randomGame.created_at,
            updated_at: randomGame.updated_at,
            created_at_pt_br: randomGame.created_at_pt_br,
            updated_at_pt_br: randomGame.updated_at_pt_br,
        });
    }, []);

    const searchGameByTitle = useCallback(async (gameTitle: string | null) => {
        if (gameTitle) {
			const searchGameTitle = new GamesRepository().getByTitle(gameTitle)

            if (!searchGameTitle.length) {
                setError(`Nothing found for search "${gameTitle}". Recommending random game...`);
                setTogalGamesFound(null);
                setGames(null);
                setFoundMoreThanOne(false);

                const randomGame = new GamesRepository().getRandom()

				setGame({
					id: randomGame.id,
					title: randomGame.title,
					cover_image: randomGame.cover_image,
					summary: randomGame.summary,
					release: {
						year: randomGame.release.year,
						date: randomGame.release.date,
					},
					igdb: {
						url: randomGame.igdb.url,
						rating: randomGame.igdb.rating,
					},
					metacritic: {
						url: randomGame.metacritic.url,
						rating: randomGame.metacritic.rating,
					},
					where_to_buy: randomGame.where_to_buy,
					developer: randomGame.developer,
					publisher: randomGame.publisher,
					platforms_available: randomGame.platforms_available,
					genres: randomGame.genres,
					how_long_to_beat: {
						url: randomGame.how_long_to_beat.url,
						main_story: {
							average: randomGame.how_long_to_beat.main_story.average,
						},
						completionist: {
							average: randomGame.how_long_to_beat.completionist.average,
						},
					},
					created_at: randomGame.created_at,
					updated_at: randomGame.updated_at,
					created_at_pt_br: randomGame.created_at_pt_br,
					updated_at_pt_br: randomGame.updated_at_pt_br,
				});
            }

            if (searchGameTitle.length > 1) {
				setError('')
                setFoundMoreThanOne(true);
                setTogalGamesFound(searchGameTitle.length);
                setGames(searchGameTitle);
            } else {
                setGames(null);
                setFoundMoreThanOne(false);
                setGame({
                    id: searchGameTitle[0].id,
                    title: searchGameTitle[0].title,
                    cover_image: searchGameTitle[0].cover_image,
                    summary: searchGameTitle[0].summary,
                    release: {
                        year: searchGameTitle[0].release.year,
                        date: searchGameTitle[0].release.date,
                    },
                    igdb: {
                        url: searchGameTitle[0].igdb.url,
                        rating: searchGameTitle[0].igdb.rating,
                    },
                    metacritic: {
                        url: searchGameTitle[0].metacritic.url,
                        rating: searchGameTitle[0].metacritic.rating,
                    },
                    where_to_buy: searchGameTitle[0].where_to_buy,
                    developer: searchGameTitle[0].developer,
                    publisher: searchGameTitle[0].publisher,
                    platforms_available: searchGameTitle[0].platforms_available,
                    genres: searchGameTitle[0].genres,
                    how_long_to_beat: {
                        url: searchGameTitle[0].how_long_to_beat.url,
                        main_story: {
                            average: searchGameTitle[0].how_long_to_beat.main_story.average,
                        },
                        completionist: {
                            average: searchGameTitle[0].how_long_to_beat.completionist.average,
                        },
                    },
                    created_at: searchGameTitle[0].created_at,
                    updated_at: searchGameTitle[0].updated_at,
                    created_at_pt_br: searchGameTitle[0].created_at_pt_br,
                    updated_at_pt_br: searchGameTitle[0].updated_at_pt_br,
                });
            }
        }
    }, []);

    useEffect(() => {
        if (queryParams.get("search")) {
            const search = queryParams.get("search");
            searchGameByTitle(search);
        } else {
            recommendRandomGame();
        }
    }, [queryParams.get("search")]);

    return (
        <>
			<Head title="The Best Developer Experience API for Games" description="Come look to see great games!"/>
            <Navbar />
            <div className="container" style={container}>
                <div className="row mt-5">
                    {error && <ErrorAlertMessage message={error} />}

                    {totalGamesFound && <SuccessAlertMessage message={`Total games found: ${totalGamesFound}`} />}

                    {!foundMoreThanOne && (
                        <>
                            <div className="col-lg-3 text-center">
                                <img
                                    id="game_image"
                                    src={game?.cover_image}
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
                                        <b id="game_igdb_link" className="fs-2 card-link text-decoration-none">
                                            <span id="game_title" className="fw-bold">
                                                {game?.title}{" "}
                                            </span>
                                            (
                                            <span id="game_year_release" className="text-muted">
                                                {game?.release.year}
                                            </span>
                                            )
                                        </b>
                                    </div>

                                    <p className="card-text" id="game_resume">
                                        {game?.summary}
                                    </p>
                                </div>
                            </div>

                            <div className="col-lg-3 mb-3">
                                <ul className="mt-3">
                                    <li className="">
                                        <b>Where To Buy:</b>
                                        <ul>
                                            {game?.where_to_buy.map((item) => (
                                                <li key={item.id}>
                                                    {/* <a href={item.url} target="_blank"> */}
													<a href="#">
                                                        {item.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li className="">
                                        <b>Ratings:</b>
                                        <ul>
                                            <li className="">
                                                {/* <a href={game?.metacritic.url as string} target="_blank"> */}
												<a href="#">
                                                    Metacritic Rating:
                                                </a>{" "}
                                                ⭐<span id="game_igdb_rating">{game?.metacritic.rating}</span>
                                            </li>
                                            <li className="">
                                                {/* <a href={game?.igdb.url as string} target="_blank"> */}
												<a href="#">
                                                    IGDB Rating:
                                                </a>{" "}
                                                ⭐<span id="game_igdb_rating">{game?.igdb.rating}</span>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="">
                                        <b>Developer:</b>
                                        <ul>
                                            <li>
                                                {/* <a href={`/developer/${game?.developer.name}`} target="_blank"> */}
												<a href="#">
                                                    {game?.developer.name}
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="">
                                        <b>Publisher:</b>
                                        <ul>
                                            <li>
                                                {/* <a href={`/publisher/${game?.publisher.name}`} target="_blank"> */}
												<a href="#">
                                                    {game?.publisher.name}
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="">
                                        <b>Genres:</b>
                                        <ul>
                                            {game?.genres.map((genre) => (
                                                <li key={genre.id}>
                                                    {/* <a href={`/genre/${genre.name}`}>{genre.name}</a> */}
													<a href="#">{genre.name}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li className="">
                                        <b>Platforms available:</b>
                                        <ul>
                                            {game?.platforms_available.map((platform) => (
                                                <li key={platform.id}>
                                                    {/* <a href={`/platform/${platform.name}`}>{platform.name}</a> */}
													<a href="#">{platform.name}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li className="">
                                        <b>HowLongToBeat:</b>
                                        <ul>
                                            <li>
                                                {/* <a href={game?.how_long_to_beat?.url as string} target="_blank"> */}
												<a href="#">
                                                    Page
                                                </a>
                                            </li>
                                            <li>Main History: {game?.how_long_to_beat?.main_story.average}</li>
                                            <li>Completionist: {game?.how_long_to_beat?.completionist.average}</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </>
                    )}

                    {foundMoreThanOne &&
                        games &&
                        totalGamesFound &&
                        games.map((game) => (
                            <div className="row mb-5" key={game.id}>
                                <div className="col-lg-3 text-center">
                                    <img
                                        id="game_image"
                                        src={game.cover_image}
                                        className="shadow mx-auto d-block w-100 image-fluid mb-3"
                                        alt="game_image"
                                    />
                                </div>

                                <div className="col-lg-6">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between mb-3">
                                            <b id="game_igdb_link" className="fs-2 card-link text-decoration-none">
                                                <span id="game_title" className="fw-bold">
                                                    {game.title}{" "}
                                                </span>
                                                (
                                                <span id="game_year_release" className="text-muted">
                                                    {game.release.year}
                                                </span>
                                                )
                                            </b>
                                        </div>

                                        <p className="card-text" id="game_resume">
                                            {game?.summary}
                                        </p>
                                    </div>
                                </div>

                                <div className="col-lg-3 mb-3">
                                    <ul className="mt-3">
                                        <li className="">
                                            <b>Where To Buy:</b>
                                            <ul>
                                                {game?.where_to_buy.map((item) => (
                                                    <li key={item.id}>
														{/* <a href={item.url} target="_blank"> */}
                                                        <a href="#">
                                                            {item.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li className="">
                                            <b>Ratings:</b>
                                            <ul>
                                                <li className="">
                                                    {/* <a href={game?.metacritic.url as string} target="_blank"> */}
													<a href="#">
                                                        Metacritic Rating:
                                                    </a>{" "}
                                                    ⭐<span id="game_igdb_rating">{game?.metacritic.rating}</span>
                                                </li>
                                                <li className="">
                                                    {/* <a href={game?.igdb.url as string} target="_blank"> */}
													<a href="#">
                                                        IGDB Rating:
                                                    </a>{" "}
                                                    ⭐<span id="game_igdb_rating">{game?.igdb.rating}</span>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="">
                                            <b>Developer:</b>
                                            <ul>
                                                <li>
                                                    {/* <a href={`/developer/${game?.developer.name}`} target="_blank"> */}
													<a href="#">
                                                        {game?.developer.name}
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="">
                                            <b>Publisher:</b>
                                            <ul>
                                                <li>
                                                    {/* <a href={`/publisher/${game?.publisher.name}`} target="_blank"> */}
													<a href="#">
                                                        {game?.publisher.name}
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="">
                                            <b>Genres:</b>
                                            <ul>
                                                {game?.genres.map((genre) => (
                                                    <li key={genre.id}>
                                                        {/* <a href={`/genre/${genre.name}`}>{genre.name}</a> */}
														<a href="#">{genre.name}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li className="">
                                            <b>Platforms available:</b>
                                            <ul>
                                                {game?.platforms_available.map((platform) => (
                                                    <li key={platform.id}>
                                                        {/* <a href={`/platform/${platform.name}`}>{platform.name}</a> */}
														<a href="#">{platform.name}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li className="">
                                            <b>HowLongToBeat:</b>
                                            <ul>
                                                <li>
                                                    {/* <a href={game?.how_long_to_beat?.url as string} target="_blank"> */}
													<a href="#">
                                                        Page
                                                    </a>
                                                </li>
                                                <li>Main History: {game?.how_long_to_beat?.main_story.average}</li>
                                                <li>Completionist: {game?.how_long_to_beat?.completionist.average}</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>

                                <hr />
                            </div>
                        ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

const container: CSSProperties = {
    marginTop: "100px",
};
