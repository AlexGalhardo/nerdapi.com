import { CSSProperties, useCallback, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { API_URL } from "../Api";
import { useLocation } from "react-router-dom";
import ErrorAlertMessage from "../Components/Alerts/ErrorAlertMessage";
import SuccessAlertMessage from "../Components/Alerts/SuccessAlertMessage";

export interface PlatformAvailable {
    id: string;
    name: string;
}

export interface Developer {
    id: string;
    name: string;
}

export interface Publisher {
    id: string;
    name: string;
}

export interface Genre {
    id: string;
    name: string;
}

export interface WhereToBuy {
    id: string;
    name: string;
    url: string;
}

export interface Game {
    id: string;
    title: string;
    cover_image: string;
    summary: string;
    release: {
        year: number;
        date: string;
    };
    igdb: {
        url: string | null;
        rating: number | null;
    };
    metacritic: {
        url: string | null;
        rating: number | null;
    };
    where_to_buy: WhereToBuy[];
    developer: Developer;
    publisher: Publisher;
    platforms_available: PlatformAvailable[];
    genres: Genre[];
    how_long_to_beat?: {
        url: string | null;
        main_story: {
            average: string | null;
        };
        completionist: {
            average: string | null;
        };
    };
    created_at: string;
    updated_at: string | null;
    created_at_pt_br: string;
    updated_at_pt_br: string | null;
}

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
        const response = await fetch(`${API_URL}/games/random`);
        const json = await response.json();
        const { data } = json;

        setGame({
            id: data.id,
            title: data.title,
            cover_image: data.cover_image,
            summary: data.summary,
            release: {
                year: data.release.year,
                date: data.release.date,
            },
            igdb: {
                url: data.igdb.url,
                rating: data.igdb.rating,
            },
            metacritic: {
                url: data.metacritic.url,
                rating: data.metacritic.rating,
            },
            where_to_buy: data.where_to_buy,
            developer: data.developer,
            publisher: data.publisher,
            platforms_available: data.platforms_available,
            genres: data.genres,
            how_long_to_beat: {
                url: data.how_long_to_beat.url,
                main_story: {
                    average: data.how_long_to_beat.main_story.average,
                },
                completionist: {
                    average: data.how_long_to_beat.completionist.average,
                },
            },
            created_at: data.created_at,
            updated_at: data.updated_at,
            created_at_pt_br: data.created_at_pt_br,
            updated_at_pt_br: data.updated_at_pt_br,
        });
    }, []);

    const searchGameByTitle = useCallback(async (gameTitle: string | null) => {
        if (gameTitle) {
            const response = await fetch(`${API_URL}/games/title/${gameTitle}`);
            const json = await response.json();
            const { data } = json;

            if (!data.length) {
                setError(`Nothing found for search "${gameTitle}". Recommending random game...`);
                setTogalGamesFound(null);
                setGames(null);
                setFoundMoreThanOne(false);

                const response = await fetch(`${API_URL}/games/random`);
                const json = await response.json();
                const { data } = json;

                setGame({
                    id: data.id,
                    title: data.title,
                    cover_image: data.cover_image,
                    summary: data.summary,
                    release: {
                        year: data.release.year,
                        date: data.release.date,
                    },
                    igdb: {
                        url: data.igdb.url,
                        rating: data.igdb.rating,
                    },
                    metacritic: {
                        url: data.metacritic.url,
                        rating: data.metacritic.rating,
                    },
                    where_to_buy: data.where_to_buy,
                    developer: data.developer,
                    publisher: data.publisher,
                    platforms_available: data.platforms_available,
                    genres: data.genres,
                    how_long_to_beat: {
                        url: data.how_long_to_beat.url,
                        main_story: {
                            average: data.how_long_to_beat.main_story.average,
                        },
                        completionist: {
                            average: data.how_long_to_beat.completionist.average,
                        },
                    },
                    created_at: data.created_at,
                    updated_at: data.updated_at,
                    created_at_pt_br: data.created_at_pt_br,
                    updated_at_pt_br: data.updated_at_pt_br,
                });
            }

            if (data.length > 1) {
                setFoundMoreThanOne(true);
                setTogalGamesFound(data.length);
                setGames(data);
            } else {
                setFoundMoreThanOne(false);
                setGame({
                    id: data[0].id,
                    title: data[0].title,
                    cover_image: data[0].cover_image,
                    summary: data[0].summary,
                    release: {
                        year: data[0].release.year,
                        date: data[0].release.date,
                    },
                    igdb: {
                        url: data[0].igdb.url,
                        rating: data[0].igdb.rating,
                    },
                    metacritic: {
                        url: data[0].metacritic.url,
                        rating: data[0].metacritic.rating,
                    },
                    where_to_buy: data[0].where_to_buy,
                    developer: data[0].developer,
                    publisher: data[0].publisher,
                    platforms_available: data[0].platforms_available,
                    genres: data[0].genres,
                    how_long_to_beat: {
                        url: data[0].how_long_to_beat.url,
                        main_story: {
                            average: data[0].how_long_to_beat.main_story.average,
                        },
                        completionist: {
                            average: data[0].how_long_to_beat.completionist.average,
                        },
                    },
                    created_at: data[0].created_at,
                    updated_at: data[0].updated_at,
                    created_at_pt_br: data[0].created_at_pt_br,
                    updated_at_pt_br: data[0].updated_at_pt_br,
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
            <Navbar />
            <div className="container" style={container}>
                <div className="row mt-5">
                    {error && <ErrorAlertMessage error={error} />}

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
                                                    <a href={item.url} target="_blank">
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
                                                <a href={game?.metacritic.url as string} target="_blank">
                                                    Metacritic Rating:
                                                </a>{" "}
                                                ⭐<span id="game_igdb_rating">{game?.metacritic.rating}</span>
                                            </li>
                                            <li className="">
                                                <a href={game?.igdb.url as string} target="_blank">
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
                                                <a href={`/developer/${game?.developer.name}`} target="_blank">
                                                    {game?.developer.name}
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="">
                                        <b>Publisher:</b>
                                        <ul>
                                            <li>
                                                <a href={`/publisher/${game?.publisher.name}`} target="_blank">
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
                                                    <a href={`/genre/${genre.name}`}>{genre.name}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li className="">
                                        <b>Platforms available:</b>
                                        <ul>
                                            {game?.platforms_available.map((platform) => (
                                                <li key={platform.id}>
                                                    <a href={`/platform/${platform.name}`}>{platform.name}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li className="">
                                        <b>HowLongToBeat:</b>
                                        <ul>
                                            <li>
                                                <a href={game?.how_long_to_beat?.url as string} target="_blank">
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
                                                        <a href={item.url} target="_blank">
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
                                                    <a href={game?.metacritic.url as string} target="_blank">
                                                        Metacritic Rating:
                                                    </a>{" "}
                                                    ⭐<span id="game_igdb_rating">{game?.metacritic.rating}</span>
                                                </li>
                                                <li className="">
                                                    <a href={game?.igdb.url as string} target="_blank">
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
                                                    <a href={`/developer/${game?.developer.name}`} target="_blank">
                                                        {game?.developer.name}
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="">
                                            <b>Publisher:</b>
                                            <ul>
                                                <li>
                                                    <a href={`/publisher/${game?.publisher.name}`} target="_blank">
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
                                                        <a href={`/genre/${genre.name}`}>{genre.name}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li className="">
                                            <b>Platforms available:</b>
                                            <ul>
                                                {game?.platforms_available.map((platform) => (
                                                    <li key={platform.id}>
                                                        <a href={`/platform/${platform.name}`}>{platform.name}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li className="">
                                            <b>HowLongToBeat:</b>
                                            <ul>
                                                <li>
                                                    <a href={game?.how_long_to_beat?.url as string} target="_blank">
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
