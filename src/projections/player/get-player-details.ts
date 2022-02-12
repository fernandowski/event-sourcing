import {pipe} from "lodash/fp";

import {sortEvents} from "../../lib/helpers";
import {fetchEventsByPlayerId} from "../../store/player";
import {orchestratePlayer, Player} from "./state-orchestrator";

export const getPlayerDetails = (playerId: string): Promise<Player> => {
    return fetchEventsByPlayerId(playerId).then(events => (pipe(sortEvents, orchestratePlayer,)(events)))
};