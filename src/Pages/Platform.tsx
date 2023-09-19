import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Head from "../Components/Head";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GamesRepository, { Game } from "../Repositories/Games.repository";
import GameFound from "../Components/GameFound";
import platformsJson from "../Repositories/Jsons/platforms.json";

const container: CSSProperties = {
    marginTop: "100px",
};

export default function Platform() {
    const { platform_name } = useParams();
    const platformName = platformsJson.filter((platform) => platform.slug === platform_name)[0].name;
    const pageTitle = `${platform_name} Games`;
    const pageDescription = `See games by platform ${platform_name}`;
    const navigate = useNavigate();
    const [games, setGames] = useState<Game[] | null>(null);
    const [totalGamesFound, setTogalGamesFound] = useState<number | null>(null);

    const searchGamesByPlatform = useCallback(async (platformName: string) => {
        const gamesFound = new GamesRepository().getByPlatform(platformName);
        if (!gamesFound.length) navigate("/");

        setTogalGamesFound(gamesFound.length);
        setGames(gamesFound);
    }, []);

    useEffect(() => {
        if (platform_name) {
            searchGamesByPlatform(platform_name);
        } else {
            navigate("/");
        }
    }, [platform_name]);

    return (
        <>
            <Head title={pageTitle} description={pageDescription} />
            <Navbar />
            <div className="container" style={container}>
                <div className="row mt-5">
                    {totalGamesFound && (
                        <p className="fs-1 text-center mb-5 alert alert-success">
                            Platform <strong className="text-success">{platformName}</strong> Games Found:{" "}
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
