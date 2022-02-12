import {fetchRegisteredPlayerIds, writeToPlayerStore} from "../../../store/player";
import {pipe} from "lodash/fp";
import events from "events";
import {storeEvent} from "../../../lib/helpers";
import {getPlayerTiedEvent} from "./event/event";
import {validatePlayerTiedEvent} from "./validation";

export const playedTied = (playerId: string): Promise<events> => {
    return fetchRegisteredPlayerIds()
        .then((playerIds) => {
            const playerDrawStatChangedEvent = getPlayerTiedEvent(playerId)
            return pipe(
                validatePlayerTiedEvent(playerIds),
                storeEvent(writeToPlayerStore, playerDrawStatChangedEvent)
            )(playerDrawStatChangedEvent);
        })
};