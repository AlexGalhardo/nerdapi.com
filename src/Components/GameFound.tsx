import { Game } from "../Repositories/Games.repository";

export default function GameFound({
    game,
    buttonRecommend,
    recommendRandomGame,
}: {
    game: Game | null;
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
                    <div className="d-flex justify-content-between mb-3">
                        <b id="game_igdb_link" className="fs-2 card-link text-decoration-none">
                            <span id="game_title" className="fw-bold">
                                {game?.title}{" "}
                            </span>
                            (
                            <span id="game_year_release" className="text-muted">
                                {game?.release.year}
                            </span>
                            )
                        </b>
                    </div>

                    <p className="card-text" id="game_resume">
                        {game?.summary}
                    </p>
                </div>
            </div>

            <div className="col-lg-3 mb-3">
                <ul className="mt-3">
                    <li className="">
                        <b>Where To Buy:</b>
                        <ul>
                            {game?.where_to_buy.map((item) => (
                                <li key={item.id}>
                                    {/* <a href={item.url} target="_blank"> */}
                                    <a href="#">{item.name}</a>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="">
                        <b>Ratings:</b>
                        <ul>
                            <li className="">
                                {/* <a href={game?.metacritic.url as string} target="_blank"> */}
                                <a href="#">Metacritic Rating:</a> ⭐
                                <span id="game_igdb_rating">{game?.metacritic.rating}</span>
                            </li>
                            <li className="">
                                {/* <a href={game?.igdb.url as string} target="_blank"> */}
                                <a href="#">IGDB Rating:</a> ⭐<span id="game_igdb_rating">{game?.igdb.rating}</span>
                            </li>
                        </ul>
                    </li>
                    <li className="">
                        <b>Developer:</b>
                        <ul>
                            <li>
                                <a href={`/developer/${game?.developer.name}`}>{game?.developer.name}</a>
                                {/* <a href="#">{game?.developer.name}</a> */}
                            </li>
                        </ul>
                    </li>
                    <li className="">
                        <b>Publisher:</b>
                        <ul>
                            <li>
                                <a href={`/publisher/${game?.publisher.name}`}>{game?.publisher.name}</a>
                                {/* <a href="#">{game?.publisher.name}</a> */}
                            </li>
                        </ul>
                    </li>
                    <li className="">
                        <b>Genres:</b>
                        <ul>
                            {game?.genres.map((genre) => (
                                <li key={genre.id}>
                                    <a href={`/genre/${genre.name}`}>{genre.name}</a>
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
                                    <a href={`/platform/${platform.name}`}>{platform.name}</a>
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

            <br className="mt-5" />
        </>
    );
}
