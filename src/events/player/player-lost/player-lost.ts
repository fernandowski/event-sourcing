import {fetchRegisteredPlayerIds, writeToPlayerStore} from "../../../store/player";
import {pipe} from "lodash/fp";
import events from "events";
import {storeEvent} from "../../../lib/helpers";
import {validatePlayerLostEvent} from "./validation";
import {getPlayerLostEvent} from "./event/event";


export const playerLost = (playerId: string): Promise<events> => {
    return fetchRegisteredPlayerIds()
        .then((playerIds) => {
            const playerLossStatChangedEvent = getPlayerLostEvent(playerId)
            return pipe(
                validatePlayerLostEvent(playerIds),
                storeEvent(writeToPlayerStore, playerLossStatChangedEvent)
            )(playerLossStatChangedEvent);
        })
};