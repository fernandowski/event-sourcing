import {pipe, map} from "lodash/fp"
import {getPlayerEventsByEventType, writeToPlayerStore} from "../../../store/player";
import {getPlayerRegisteredEvent, PLAYER_REGISTERED, PlayerRegisteredEvent} from "./event/event";
import {validatePlayerRegisteredEvent} from "./validation";
import {storeEvent} from "../../../lib/helpers";

export const getRegisteredUserIds = (): Promise<[string]> => {
    return getPlayerEventsByEventType(PLAYER_REGISTERED)
        .then((data) => {
            return map(({data: {userId}}) => (userId), data);
        })

}

export const playerRegistered = (firstName: string, lastname: string, userName: string): Promise<PlayerRegisteredEvent> => {
    const createPlayerEvent = getPlayerRegisteredEvent(firstName, lastname, userName);
    return getRegisteredUserIds().then(
        (data) => {
            return pipe(
                validatePlayerRegisteredEvent(data),
                storeEvent(writeToPlayerStore, createPlayerEvent),
            )(createPlayerEvent)
        }
    );
}
