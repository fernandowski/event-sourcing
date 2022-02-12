import {fetchRegisteredPlayerIds} from "../../store/player";
import {map, orderBy, pipe} from "lodash/fp";
import {getPlayerDetails} from "./get-player-details";
import {Player} from "./state-orchestrator";

const getAllPlayerDetails = (playerIds: [string]) => {
    return map((playerId: string) => (getPlayerDetails(playerId)))(playerIds);
};

export const leaderboardByMostWon = (): Promise<Player> => {
    return fetchRegisteredPlayerIds()
        .then((registeredPlayerIds: [string]) => {
            return Promise.all(getAllPlayerDetails(registeredPlayerIds))
        })
        .then((players) => {
            return pipe(
                orderBy(player => player.statistics.wins, 'desc')
            )(players);
        })
};