export function iterateFromIndex(totalGamesPerPage: number, games: any, pageOffset: number) {
    const newOffset = (pageOffset * totalGamesPerPage) % games.length;
    const arrayFromOffeset = [];
    for (let i = newOffset; i < newOffset + totalGamesPerPage; i++) {
        if (games[i]) arrayFromOffeset.push(games[i]);
        if (!games[i]) break;
    }
    return arrayFromOffeset;
}
