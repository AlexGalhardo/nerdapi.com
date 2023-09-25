import { TOTAL_GAMES_PER_PAGE } from "./Envs";
import { Game } from "../Repositories/Games.repository";

export function iterateFromIndex(games: Game[], pageOffset: number): Game[] {
    const newOffset = (pageOffset * TOTAL_GAMES_PER_PAGE) % games.length;
    const arrayFromOffeset: Game[] = [];
    for (let i = newOffset; i < newOffset + TOTAL_GAMES_PER_PAGE; i++) {
        if (games[i]) arrayFromOffeset.push(games[i]);
        if (!games[i]) break;
    }
	console.log('arrayFromOffeset => ', arrayFromOffeset)
    return arrayFromOffeset;
}
