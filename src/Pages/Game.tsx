import { useCallback, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import GamesRepository, { Game } from "../Repositories/Games.repository";
import Head from "../Components/Head";
import GameFound from "../Components/GameFound";
import { container } from "../Utils/Functions";

export default function GamePage() {
    const { game_title_slug } = useParams();
    const pageDescription = `See information about ${game_title_slug}`;
    const navigate = useNavigate();
    const [game, setGame] = useState<Game | null>();
    const searchGameByTitle = useCallback(async (gameTitleSlug: string) => {
        const gameFound = new GamesRepository().getByTitleSlug(gameTitleSlug);
        if (!gameFound) {
            setGame(null);
            navigate("/");
        }

        setGame(gameFound);
    }, []);

    useEffect(() => {
        if (game_title_slug) {
            searchGameByTitle(game_title_slug);
        } else {
            navigate("/");
        }
    }, [game_title_slug]);

    return (
        <>
            <Head title={game?.title} description={pageDescription} />
            <Navbar />
            <div className="container" style={container}>
                <div className="row mt-5">
                    <GameFound game={game} />
                </div>
            </div>
        </>
    );
}
