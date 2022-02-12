import {fetchRegisteredPlayerIds, writeToPlayerStore} from "../../../store/player";
import {pipe} from "lodash/fp";
import events from "events";
import {storeEvent} from "../../../lib/helpers";
import {validatePlayerWonEvent} from "./validation";
import {getPlayerWonEvent} from "./event/event";


export const playerWon = (playerId: string): Promise<events> => {
    return fetchRegisteredPlayerIds()
        .then((playerIds) => {
            const playerWinStatChangedEvent = getPlayerWonEvent(playerId)
            return pipe(
                validatePlayerWonEvent(playerIds),
                storeEvent(writeToPlayerStore, playerWinStatChangedEvent)
            )(playerWinStatChangedEvent);
        })
};