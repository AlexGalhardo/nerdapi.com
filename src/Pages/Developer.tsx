import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Head from "../Components/Head";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GamesRepository, { Game } from "../Repositories/Games.repository";
import GameFound from "../Components/GameFound";
import developersJson from "../Repositories/Jsons/developers.json";

const container: CSSProperties = {
    marginTop: "100px",
};

export default function Developer() {
    const { developer_name } = useParams();
    const developerName = developersJson.filter((developer) => developer.slug === developer_name)[0].name;
    const pageTitle = `${developer_name} Games`;
    const pageDescription = `See games made by developer ${developer_name}`;
    const navigate = useNavigate();
    const [games, setGames] = useState<Game[] | null>(null);
    const [totalGamesFound, setTogalGamesFound] = useState<number | null>(null);

    const searchDeveloperGames = useCallback(async (developerName: string) => {
        const gamesFound = new GamesRepository().getByDeveloper(developerName);
        if (!gamesFound.length) navigate("/");

        setTogalGamesFound(gamesFound.length);
        setGames(gamesFound);
    }, []);

    useEffect(() => {
        if (developer_name) {
            searchDeveloperGames(developer_name);
        } else {
            navigate("/");
        }
    }, [developer_name]);

    return (
        <>
            <Head title={pageTitle} description={pageDescription} />
            <Navbar />
            <div className="container" style={container}>
                <div className="row mt-5">
                    {totalGamesFound && (
                        <p className="fs-1 mb-5 alert alert-light">
                            Developer <strong className="text-success">{developerName}</strong> Games Found:{" "}
                            <strong className="text-danger">{totalGamesFound}</strong>
                        </p>
                    )}

                    {games?.map((game) => <GameFound game={game} />)}
                </div>
            </div>

            <Footer />
        </>
    );
}
