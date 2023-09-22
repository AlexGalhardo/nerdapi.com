import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Head from "../Components/Head";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GamesRepository, { Game } from "../Repositories/Games.repository";
import GameFound from "../Components/GameFound";
import genresJson from "../Repositories/Jsons/genres.json";

const container: CSSProperties = {
    marginTop: "100px",
};

export default function Genre() {
    const { genre_name } = useParams();
    const genreName = genresJson.filter((genre) => genre.slug === genre_name)[0].name;
    const pageTitle = `${genre_name} Games`;
    const pageDescription = `See games by genre ${genre_name}`;
    const navigate = useNavigate();
    const [games, setGames] = useState<Game[] | null>(null);
    const [totalGamesFound, setTogalGamesFound] = useState<number | null>(null);

    const searchGamesByGenre = useCallback(async (genreName: string) => {
        const gamesFound = new GamesRepository().getByGenre(genreName);
        if (!gamesFound.length) navigate("/");

        setTogalGamesFound(gamesFound.length);
        setGames(gamesFound);
    }, []);

    useEffect(() => {
        if (genre_name) {
            searchGamesByGenre(genre_name);
        } else {
            navigate("/");
        }
    }, [genre_name]);

    return (
        <>
            <Head title={pageTitle} description={pageDescription} />
            <Navbar />
            <div className="container" style={container}>
                <div className="row mt-5">
                    {totalGamesFound && (
                        <p className="fs-1 mb-5 alert alert-light">
                            Genre <strong className="text-success">{genreName}</strong> Games Found:{" "}
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
