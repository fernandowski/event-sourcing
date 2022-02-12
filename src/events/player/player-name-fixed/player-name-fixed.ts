import {fetchRegisteredPlayerIds, writeToPlayerStore} from "../../../store/player"
import {pipe} from "lodash/fp"
import {getPlayerInformationChangedEvent} from "./event/event"
import {validatePlayerNameFixed} from "./validation";
import {storeEvent} from "../../../lib/helpers";
import * as events from "events";

export const playerNameFixed = (playerId: string, firstName: string, lastName: string): Promise<events> => {
    const playerInformationChangedEvent = getPlayerInformationChangedEvent(playerId, firstName, lastName)
    return fetchRegisteredPlayerIds()
        .then((playerIds) => {
            return pipe(
                validatePlayerNameFixed(playerIds),
                storeEvent(writeToPlayerStore, playerInformationChangedEvent)
            )(playerInformationChangedEvent);
        });
};