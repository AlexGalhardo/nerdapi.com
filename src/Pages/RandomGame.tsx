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

export default function RandomGame() {
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
            ...randomGame,
        });
    }, []);

    const searchGameByTitle = useCallback(async (gameTitle: string | null) => {
        if (gameTitle) {
            const searchGameTitle = new GamesRepository().searchAllGamesSimilarTitle(gameTitle);

            if (!searchGameTitle.length) {
                setError(`Nothing found for search "${gameTitle}". Recommending random game...`);
                setTogalGamesFound(null);
                setGames(null);
                setFoundMoreThanOne(false);

                const randomGame = new GamesRepository().getRandom();

                setGame({
                    ...randomGame,
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
                    ...searchGameTitle[0],
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

                    {totalGamesFound && (
                        <p className="fs-1 text-center mb-5 alert alert-success">
                            Searching <strong className="text-success">{queryParams.get("search")}...</strong>{" "}
                            Found<strong className="text-danger"> {totalGamesFound}</strong> Games
                        </p>
                    )}

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
