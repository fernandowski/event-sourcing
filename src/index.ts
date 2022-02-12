import {playerLost, playerRegistered, playerWon, playedTied} from "./events";
import {leaderboardByMostWon} from "./projections";

(async () => {
        const registerPlayer = await playerRegistered('fernando', 'lopes', 'flopez')
        await playerWon('3de4644f-8282-458b-8ad5-c7b38865be44');
        await playerLost('3de4644f-8282-458b-8ad5-c7b38865be44');
        await playedTied('3de4644f-8282-458b-8ad5-c7b38865be44');
        const leaderboardWin = await leaderboardByMostWon();
        console.log(leaderboardWin);
    }
)();