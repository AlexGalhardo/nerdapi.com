import { CSSProperties } from "react";
import { Game } from "../Repositories/Games.repository";

export default function GameFound({
    game,
    buttonRecommend,
    recommendRandomGame,
}: {
    game: Game | null | undefined;
    buttonRecommend?: boolean;
    recommendRandomGame?: any;
}) {
    return (
        <>
            <div className="col-lg-3 text-center">
                <img
                    id="game_image"
                    src={game?.cover_image}
                    className="shadow mx-auto d-block w-100 image-fluid mb-3"
                    alt="game_image"
                />
                {buttonRecommend && (
                    <button
                        className="button mt-3 w-80 btn mb-5 btn-success fw-bold fs-5"
                        onClick={recommendRandomGame}
                    >
                        <i className="bi bi-play-fill"></i>
                        Recommend Random Game
                    </button>
                )}
            </div>

            <div className="col-lg-6">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <a className="fs-2 text-decoration-none" href={`/game/${game?.slug}`}>
                            <span className="fw-bold">{game?.title} </span>(<span className="text-white">2020</span>)
                        </a>

                        {game?.metacritic?.rating && (
							<p className="fs-2 fw-bold text-warning text-decoration-none">
                            	⭐<span id="game_igdb_rating">{game?.metacritic?.rating}</span>
                        	</p>
						)}
                    </div>

                    <p>{game?.summary}</p>
                </div>
            </div>

            <div className="col-lg-3 mb-3">
                <ul className="mt-3">
                    <li className="">
                        <b>Developer:</b>
                        <ul>
                            <li>
                                <a href={`/developer/${game?.developer?.slug}`}>{game?.developer?.name}</a>
                                {/* <a href="#">{game?.developer.name}</a> */}
                            </li>
                        </ul>
                    </li>
                    <li className="">
                        <b>Publisher:</b>
                        <ul>
                            <li>
                                <a href={`/publisher/${game?.publisher?.slug}`}>{game?.publisher?.name}</a>
                                {/* <a href="#">{game?.publisher.name}</a> */}
                            </li>
                        </ul>
                    </li>
                    <li className="">
                        <b>Genres:</b>
                        <ul>
                            {game?.genres?.map((genre) => (
                                <li key={genre.id}>
                                    <a href={`/genre/${genre?.slug}`}>{genre?.name}</a>
                                    {/* <a href="#">{genre.name}</a> */}
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="">
                        <b>Platforms available:</b>
                        <ul>
                            {game?.platforms_available?.map((platform) => (
                                <li key={platform.id}>
                                    <a href={`/platform/${platform.slug}`}>{platform.name}</a>
                                    {/* <a href="#">{platform.name}</a> */}
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </div>

            <span className="mt-5" />
        </>
    );
}
