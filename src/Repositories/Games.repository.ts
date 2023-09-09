import * as stringSimilarity from "string-similarity";

import gamesDatabase from "./Jsons/games.json";

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

export interface WhereToBuy {
    id: string;
    name: string;
    url: string;
}

export interface Game {
    id: string;
    title: string;
    cover_image: string;
    summary: string;
    release: {
        year: number;
        date: string;
    };
    igdb: {
        url: string | null;
        rating: number | null;
    };
    metacritic: {
        url: string | null;
        rating: number | null;
    };
    where_to_buy: WhereToBuy[];
    developer: Developer;
    publisher: Publisher;
    platforms_available: PlatformAvailable[];
    genres: Genre[];
    how_long_to_beat: {
        url: string | null;
        main_story: {
            average: string | null;
        };
        completionist: {
            average: string | null;
        };
    };
    created_at: string;
    updated_at: string | null;
    created_at_pt_br: string;
    updated_at_pt_br: string | null;
}

export interface GamesRepositoryPort {
    getById(gameId: string): Game;
    getByTitle(gameTitle: string): Game[];
    getRandom(): Game;
}

export default class GamesRepository implements GamesRepositoryPort {
    constructor(private games: Game[] = gamesDatabase) {}

    public getById(gameId: string): Game {
        return this.games.filter((game: Game) => game.id === gameId)[0];
    }

    public getByTitle(gameTitle: string): Game[] {
        const gamesFound = this.games.filter((game: Game) =>
            game.title.toLowerCase().includes(gameTitle.toLowerCase()),
        );

        const matches = stringSimilarity.findBestMatch(
            gameTitle,
            this.games.map((game) => game.title),
        );

        matches.ratings.forEach((similarity) => {
            if (similarity.rating >= 0.5) {
                if (!gamesFound.some((game) => game.title.toLowerCase() === similarity.target.toLowerCase())) {
                    gamesFound.push(this.games.filter((game) => game.title === similarity.target)[0]);
                }
            }
        });

        return gamesFound;
    }

    public getRandom(): Game {
        return this.games[Math.floor(Math.random() * this.games.length)];
    }
}
