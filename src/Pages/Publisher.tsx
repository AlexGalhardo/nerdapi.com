import Navbar from "../Components/Navbar";
import Head from "../Components/Head";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GamesRepository, { Game } from "../Repositories/Games.repository";
import GameFound from "../Components/GameFound";
import publishersJson from "../Repositories/Jsons/publishers.json";
import ReactPaginate from "react-paginate";
import { TOTAL_GAMES_PER_PAGE } from "../Utils/Envs";
import { iterateFromIndex } from "../Utils/Functions";

const container: CSSProperties = {
    marginTop: "100px",
};

export default function Publisher() {
    const { publisher_name } = useParams();
    const publisherName = publishersJson.filter((publisher) => publisher.slug === publisher_name)[0].name;
    const pageTitle = `${publisherName} Games`;
    const pageDescription = `See games made by publisher ${publisher_name}`;
    const navigate = useNavigate();
    const [games, setGames] = useState<Game[] | null>(null);
    const [totalGamesFound, setTogalGamesFound] = useState<number | null>(null);
    const [paginationGames, setPaginationGames] = useState<Game[]>();
    const [pageCount, setPageCount] = useState(0);
    const [pageOffset, setPageOffset] = useState(0);

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

    useEffect(() => {
        if (games?.length) {
            setPaginationGames(iterateFromIndex(games!, 0));
            setPageCount(Math.ceil(games.length / TOTAL_GAMES_PER_PAGE));
            setPageOffset(0);
        }
    }, [games]);

    const handlePageChange = (event: any) => {
        setPaginationGames(iterateFromIndex(games!, event.selected));
        setPageCount(Math.ceil((games?.length as number) / TOTAL_GAMES_PER_PAGE));
        setPageOffset(event.selected);
    };

    return (
        <>
            <Head title={pageTitle} description={pageDescription} />
            <Navbar />
            <div className="container" style={container}>
                <div className="row mt-5">
                    {totalGamesFound && (
                        <p className="fs-1 mb-5 alert alert-light">
                            Publisher <strong className="text-success">{publisherName}</strong> Games Found:{" "}
                            <strong className="text-danger">{totalGamesFound}</strong>
                        </p>
                    )}

                    {totalGamesFound && totalGamesFound >= TOTAL_GAMES_PER_PAGE && (
                        <ReactPaginate
                            previousLabel="Previous"
                            nextLabel="Next"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            pageCount={pageCount}
                            pageRangeDisplayed={TOTAL_GAMES_PER_PAGE}
                            onPageChange={handlePageChange}
                            containerClassName="pagination"
                            activeClassName="active"
                            className="pagination justify-content-center mb-5"
                            forcePage={pageOffset}
                        />
                    )}

                    {paginationGames?.map((game) => <GameFound game={game} />)}

                    {totalGamesFound && totalGamesFound >= TOTAL_GAMES_PER_PAGE && (
                        <ReactPaginate
                            previousLabel="Previous"
                            nextLabel="Next"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            pageCount={pageCount}
                            pageRangeDisplayed={TOTAL_GAMES_PER_PAGE}
                            onPageChange={handlePageChange}
                            containerClassName="pagination"
                            activeClassName="active"
                            className="pagination justify-content-center mb-5"
                            forcePage={pageOffset}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
