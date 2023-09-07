import { CSSProperties, useCallback, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { API_URL } from "../Api";

export interface PlatformAvailable {
	id: string;
	name: string;
}

export interface Developer {
	id: string;
	name: string;
}

export interface Publisher {
	id: string;
	name: string;
}

export interface Genre {
	id: string;
	name: string;
}

export interface Game {
    id: string;
    title: string;
	cover_image: string;
	summary: string;
    release: {
		year: number;
		date: string;
	}
    igdb: {
		url: string | null;
		rating: number | null;
	}
	metacritic: {
		url: string | null;
		rating: number | null;
	}
	where_to_buy: {
		amazon_url: string;
		steam_url: string;
		gog_url: string;
		epic_games: string;
		playstation_store: string;
		nitendo_store: string;
		xbox_store: string;
		google_play: string;
		apple_app_store: string;
	}
	developer: Developer
	publisher: Publisher
	platforms_available: PlatformAvailable[]
	genres: Genre[]
	how_long_to_beat?: {
		url: string | null;
		main_story: {
			average: string | null;
		}
		completionist: {
			average: string | null;
		}
	}
    created_at: string;
    updated_at: string | null;
    created_at_pt_br: string;
    updated_at_pt_br: string | null;
}

export default function Games() {
    const [error, setError] = useState<string>();
	const [game, setGame] = useState<Game | null>(null)

	let whereToBuy = [
			{
				id: '123',
				name: 'Buy On Amazon',
				url: 'https://www.amazon.com/'
			},
			{
				id: '432',
				name: 'Buy On Steam',
				url: 'https://store.steampowered.com/'
			},
			// {
			// 	id: '123',
			// 	name: 'Buy On GOG',
			// 	url: 'https://www.gog.com/'
			// },
			// {
			// 	id: '123',
			// 	name: 'Buy On EpicStore',
			// 	url: 'https://store.epicgames.com/en-US/'
			// },
			// {
			// 	id: '123',
			// 	name: 'Buy On PlayStation Store',
			// 	url: 'https://store.playstation.com/pt-br/pages/latest'
			// },
			// {
			// 	id: '123',
			// 	name: 'Buy On Nintendo Store',
			// 	url: 'https://www.nintendo.com/store/games/'
			// },
			// {
			// 	id: '123',
			// 	name: 'Buy On Xbox Store',
			// 	url: 'https://www.xbox.com/en-US/microsoft-store'
			// },
			// {
			// 	id: '123',
			// 	name: 'Buy On GooglePlay',
			// 	url: 'https://play.google.com/store/games?gl=US'
			// },
			// {
			// 	id: '123',
			// 	name: 'Buy On Apple Story',
			// 	url: 'https://www.apple.com/app-store/'
			// }
		]

    const recommendRandomGame = useCallback(async () => {
        const response = await fetch(`${API_URL}/games/random`);
        const json = await response.json();
		const {data} = json;
		// console.log('\n\n data é => ', data)
		setGame({
			id: data.id,
			title: data.title,
			cover_image: data.cover_image,
			summary: data.summary,
			release: {
				year: data.release.year,
				date: data.release.date,
			},
			igdb: {
				url: data.igdb.url,
				rating: data.igdb.rating,
			},
			metacritic: {
				url: data.metacritic.url,
				rating: data.metacritic.rating,
			},
			where_to_buy: {
				amazon_url: data.where_to_buy.amazon_url,
				steam_url: data.where_to_buy.steam_url,
				gog_url: data.where_to_buy.gog_url,
				epic_games: data.where_to_buy.epic_games,
				playstation_store: data.where_to_buy.playstation_store,
				nitendo_store: data.where_to_buy.nitendo_store,
				xbox_store: data.where_to_buy.xbox_store,
				google_play: data.where_to_buy.google_play,
				apple_app_store: data.where_to_buy.apple_app_store,
			},
			developer: data.developer,
			publisher: data.publisher,
			platforms_available: data.platforms_available,
			genres: data.genres,
			how_long_to_beat: {
				url: data.how_long_to_beat.url,
				main_story: {
					average: data.how_long_to_beat.main_story.average,
				},
				completionist: {
					average: data.how_long_to_beat.completionist.average,
				}
			},
			created_at: data.created_at,
			updated_at: data.updated_at,
			created_at_pt_br: data.created_at_pt_br,
			updated_at_pt_br: data.updated_at_pt_br,
		})

		const whereToBuy = {
			amazon_url: 'url_here',
			steam_url: 'url_here',
			gog_url: 'url_here',
			epic_games: 'url_here',
			playstation_store: 'url_here',
			nitendo_store: 'url_here',
			xbox_store: 'url_here',
			google_play: 'url_here',
			apple_app_store: 'url_here',
		};
    }, []);

    useEffect(() => {
        recommendRandomGame()
    }, []);

    return (
        <>
            <Navbar />
            <div className="container" style={container}>
                <div className="row mt-5">
                    <div className="col-lg-3 text-center">
                        <img
                            id="game_image"
                            src={game?.cover_image}
                            className="shadow mx-auto d-block w-100 image-fluid mb-3"
                            alt="game_image"
                        />
                        <button
                            className="button mt-3 w-80 btn btn-lg btn-outline-dark mb-3"
                            onClick={recommendRandomGame}
                        >
                            <i className="bi bi-play-fill"></i>
                            Recommend Other Game
                        </button>
                    </div>

                    <div className="col-lg-6">
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <b
                                    id="game_igdb_link"
                                    className="fs-2 card-link text-decoration-none"
                                >
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
									{whereToBuy.map(item => (
										<li key={item.id}>
											<a href={item.url}>{item.name}</a>
										</li>
									))}
								</ul>
							</li>
							<li className="">
								<b>Ratings:</b>
								<ul>
									<li className="">
										<a href={game?.metacritic.url as string} target="_blank">Metacritic Rating:</a> ⭐<span id="game_igdb_rating">{game?.metacritic.rating}</span>
									</li>
									<li className="">
										<a href={game?.igdb.url as string} target="_blank">IGDB Rating:</a> ⭐<span id="game_igdb_rating">{game?.igdb.rating}</span>
									</li>
								</ul>
							</li>
							<li className="">
								<b>Developer:</b>
								<ul>
									<li><a href={`/developer/${game?.developer.name}`} target="_blank">{game?.developer.name}</a></li>
								</ul>
							</li>
							<li className="">
								<b>Publisher:</b>
								<ul>
									<li><a href={`/publisher/${game?.publisher.name}`} target="_blank">{game?.publisher.name}</a></li>
								</ul>
							</li>
							<li className="">
								<b>Genres:</b>
								<ul>
									{game?.genres.map(genre => (
										<li key={genre.id}>
											<a href={`/genre/${genre.name}`}>{genre.name}</a>
										</li>
									))}
								</ul>
							</li>
							<li className="">
								<b>Platforms available:</b>
								<ul>
									{game?.platforms_available.map(platform => (
										<li key={platform.id}>
											<a href={`/platform/${platform.name}`}>{platform.name}</a>
										</li>
									))}
								</ul>
							</li>
							<li className="">
								<b>HowLongToBeat:</b>
								<ul>
									<li><a href={game?.how_long_to_beat?.url as string} target="_blank">Page</a></li>
									<li>Main History: {game?.how_long_to_beat?.main_story.average}</li>
									<li>Completionist: {game?.how_long_to_beat?.completionist.average}</li>
								</ul>
							</li>
						</ul>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

const container: CSSProperties = {
    marginTop: "100px",
};
