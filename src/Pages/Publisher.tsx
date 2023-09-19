import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Head from "../Components/Head";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GamesRepository, { Game } from "../Repositories/Games.repository";
import SuccessAlertMessage from "../Components/Alerts/SuccessAlertMessage";
import GameFound from "../Components/GameFound";

const container: CSSProperties = {
    marginTop: "100px",
};

export default function Publisher() {
    const { publisher_name } = useParams();
    const pageTitle = `${publisher_name} Games`;
    const pageDescription = `See games made by publisher ${publisher_name}`;
    const navigate = useNavigate();
    const [games, setGames] = useState<Game[] | null>(null);
    const [totalGamesFound, setTogalGamesFound] = useState<number | null>(null);

    const searchPublisherGames = useCallback(async (publisherName: string) => {
        const gamesFound = new GamesRepository().getByPublisher(publisherName);
        if (!gamesFound.length) navigate("/");

        setTogalGamesFound(gamesFound.length);
        setGames(gamesFound);
    }, []);

    useEffect(() => {
        if (publisher_name) {
            searchPublisherGames(publisher_name);
        } else {
            navigate("/");
        }
    }, [publisher_name]);

    return (
        <>
            <Head title={pageTitle} description={pageDescription} />
            <Navbar />
            <div className="container" style={container}>
                <div className="row mt-5">
                    {totalGamesFound && (
                        <SuccessAlertMessage message={`Publisher ${publisher_name} Games Found: ${totalGamesFound}`} />
                    )}

                    {games?.map((game) => <GameFound game={game} />)}
                </div>
            </div>

            <Footer />
        </>
    );
}
