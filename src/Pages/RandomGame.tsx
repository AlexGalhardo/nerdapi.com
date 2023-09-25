import { CSSProperties, useCallback, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useLocation } from "react-router-dom";
import ErrorAlertMessage from "../Components/Alerts/ErrorAlertMessage";
import ReactPaginate from "react-paginate";
import GamesRepository, { Game } from "../Repositories/Games.repository";
import Head from "../Components/Head";
import GameFound from "../Components/GameFound";
import { iterateFromIndex } from "../Utils/Functions";
import { TOTAL_GAMES_PER_PAGE } from "../Utils/Envs";

const container: CSSProperties = {
    marginTop: "100px",
};

export default function RandomGame() {
    const [error, setError] = useState<string | null>();
    const [game, setGame] = useState<Game | null>(null);
    const [games, setGames] = useState<Game[] | null>(null);
    const [foundMoreThanOne, setFoundMoreThanOne] = useState<boolean>(false);
    const [totalGamesFound, setTogalGamesFound] = useState<number | null>(null);
	const [paginationGames, setPaginationGames] = useState<Game[]>();
	const [pageCount, setPageCount] = useState(0);
    const [pageOffset, setPageOffset] = useState(0);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const recommendRandomGame = useCallback(async () => {
        setError("");
        const randomGame = new GamesRepository().getRandom();

        setGame({
            ...randomGame,
        });
		setPageCount(0);
    }, []);

    const searchGameByTitle = useCallback(async (gameTitle: string | null) => {
        if (gameTitle) {
            const searchGameTitle = new GamesRepository().searchAllGamesSimilarTitle(gameTitle);

            if (!searchGameTitle.length) {
                setError(`Nothing found for search "${gameTitle}". Recommending random game...`);
                setTogalGamesFound(null);
                setGames(null);
				setPageCount(0);
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
				setPageCount(Math.ceil(games?.length as number / TOTAL_GAMES_PER_PAGE));
            } else {
                setGames(null);
                setFoundMoreThanOne(false);
				setPageCount(0);
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

	useEffect(() => {
		if(games?.length){
			setPaginationGames(iterateFromIndex(TOTAL_GAMES_PER_PAGE, games, 0));
			setPageCount(Math.ceil(games?.length as number / TOTAL_GAMES_PER_PAGE));
			setPageOffset(0);
		}
	}, [games])

	const handlePageChange = (event: any) => {
		setPaginationGames(iterateFromIndex(TOTAL_GAMES_PER_PAGE, games, event.selected));
		setPageCount(Math.ceil(games?.length as number / TOTAL_GAMES_PER_PAGE));
		setPageOffset(event.selected);
    };

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
                        <p className="fs-1 mb-5 alert alert-light">
                            Searching <strong className="text-success">{queryParams.get("search")}...</strong> Found
                            <strong className="text-danger"> {totalGamesFound}</strong> Games
                        </p>
                    )}

					{totalGamesFound && totalGamesFound >= 2 && (
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

                    {!foundMoreThanOne && (
                        <GameFound game={game} buttonRecommend={true} recommendRandomGame={recommendRandomGame} />
                    )}

                    {foundMoreThanOne && games && totalGamesFound && paginationGames?.map((game: Game) => <GameFound game={game} />)}

					{totalGamesFound && totalGamesFound >= 2 && (
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
