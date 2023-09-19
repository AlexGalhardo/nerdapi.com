import { CSSProperties } from "react";
import { Game } from "../Repositories/Games.repository";

const amazonButton: CSSProperties = {
    border: "none",
    textDecoration: "none",
};

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
                    <button className="button mt-3 w-80 btn btn-lg btn-outline-dark mb-3" onClick={recommendRandomGame}>
                        <i className="bi bi-play-fill"></i>
                        Recommend Other Game
                    </button>
                )}
            </div>

            <div className="col-lg-6">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <a className="fs-2 text-decoration-none" href={`/game/${game?.slug}`}>
                            <span className="fw-bold">{game?.title} </span>(
                            <span className="text-muted">{game?.release.year}</span>)
                        </a>

                        <p className="fs-2 fw-bold text-warning text-decoration-none">
                            ⭐<span id="game_igdb_rating">{game?.metacritic.rating}</span>
                        </p>
                    </div>

                    <p>{game?.summary}</p>
                </div>
            </div>

            <div className="col-lg-3 mb-3">
                <div className="text-center">
                    {game?.where_to_buy.map((item) => (
                        <a href="https://amazon.com.br" target="_blank" rel="noopener noreferrer" style={amazonButton}>
                            <img src="https://www.niftybuttons.com/amazon/amazon-button2.png" />
                        </a>
                    ))}
                </div>

                <ul className="mt-3">
                    <li className="">
                        <b>Developer:</b>
                        <ul>
                            <li>
                                <a href={`/developer/${game?.developer.slug}`}>{game?.developer.name}</a>
                                {/* <a href="#">{game?.developer.name}</a> */}
                            </li>
                        </ul>
                    </li>
                    <li className="">
                        <b>Publisher:</b>
                        <ul>
                            <li>
                                <a href={`/publisher/${game?.publisher.slug}`}>{game?.publisher.name}</a>
                                {/* <a href="#">{game?.publisher.name}</a> */}
                            </li>
                        </ul>
                    </li>
                    <li className="">
                        <b>Genres:</b>
                        <ul>
                            {game?.genres.map((genre) => (
                                <li key={genre.id}>
                                    <a href={`/genre/${genre.slug}`}>{genre.name}</a>
                                    {/* <a href="#">{genre.name}</a> */}
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="">
                        <b>Platforms available:</b>
                        <ul>
                            {game?.platforms_available.map((platform) => (
                                <li key={platform.id}>
                                    <a href={`/platform/${platform.slug}`}>{platform.name}</a>
                                    {/* <a href="#">{platform.name}</a> */}
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="">
                        <b>HowLongToBeat:</b>
                        <ul>
                            <li>
                                {/* <a href={game?.how_long_to_beat?.url as string} target="_blank"> */}
                                <a href="#">Page</a>
                            </li>
                            <li>Main History: {game?.how_long_to_beat?.main_story.average}</li>
                            <li>Completionist: {game?.how_long_to_beat?.completionist.average}</li>
                        </ul>
                    </li>
                </ul>
            </div>

            <span className="mt-5" />
        </>
    );
}
