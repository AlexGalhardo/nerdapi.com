import { CSSProperties, useCallback, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useLocation } from "react-router-dom";
import ErrorAlertMessage from "../Components/Alerts/ErrorAlertMessage";
import SuccessAlertMessage from "../Components/Alerts/SuccessAlertMessage";
import GamesRepository, { Game } from "../Repositories/Games.repository";
import Head from "../Components/Head";
import GameFound from "../Components/GameFound";

const container: CSSProperties = {
    marginTop: "100px",
};

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
        const randomGame = new GamesRepository().getRandom();

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
            const searchGameTitle = new GamesRepository().getByTitle(gameTitle);

            if (!searchGameTitle.length) {
                setError(`Nothing found for search "${gameTitle}". Recommending random game...`);
                setTogalGamesFound(null);
                setGames(null);
                setFoundMoreThanOne(false);

                const randomGame = new GamesRepository().getRandom();

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
                setError("");
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
            <Head
                title="Games API for Developers"
                description="The best games recomendation system and api for developers & gamers on internet."
            />
            <Navbar />
            <div className="container" style={container}>
                <div className="row mt-5">
                    {error && <ErrorAlertMessage message={error} />}

                    {totalGamesFound && <SuccessAlertMessage message={`Total Games Found: ${totalGamesFound}`} />}

                    {!foundMoreThanOne && (
                        <GameFound game={game} buttonRecommend={true} recommendRandomGame={recommendRandomGame} />
                    )}

                    {foundMoreThanOne && games && totalGamesFound && games.map((game) => <GameFound game={game} />)}
                </div>
            </div>
            <Footer />
        </>
    );
}
