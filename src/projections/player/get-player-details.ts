import {pipe} from "lodash/fp";

import {sortEvents} from "../../lib/helpers";
import {fetchEventsByPlayerId} from "../../store/player";
import {orchestratePlayer} from "./state-orchestrator";

export const getPlayerDetails = (playerId: string) => {
    return fetchEventsByPlayerId(playerId).then(events => (pipe(sortEvents, orchestratePlayer,)(events)))
};