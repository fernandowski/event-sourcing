import {playerLost, playerRegistered, playerWon, playedTied} from "./events";
import {leaderboardByMostWon} from "./projections";

(async () => {
        const id = '3de4644f-8282-458b-8ad5-c7b38865be44'
        const registerPlayer = await playerRegistered('fernando', 'lopes', 'flopez')
        await playerWon(id);
        await playerLost(id);
        await playedTied(id);
        const leaderboardWin = await leaderboardByMostWon();
        console.log(leaderboardWin);
    }
)();