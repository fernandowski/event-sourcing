import {cond, curry, pipe, stubTrue} from 'lodash/fp';
import {fetchEventsById, writeToGameStore} from "../../store/game";
import {buildState, sortEvents} from "../../lib/helpers";
import { DateTime } from 'luxon';
import {validateGameEnded} from "./validation";
import {getEndedEvent} from './event/event'

export const storeEvent = curry(
    (store, event, errors) => {
        return cond(
            [
                [(errors) => (errors.length > 0), () => ({ status: 'NOT_VALID', errors})],
                [stubTrue, () => (store(event))]
            ]
        )(errors);
    }
);

export const buildGame = (events) => {
    const buildMap = {
        'GAME_STARTED': ({data: {gameId, maxPlayers,}, eventTime}) => ({
            id: gameId,
            maxPlayers,
            currentPlayers: 0,
            startTimestamp: eventTime,
            inProgress: true,
        }),
        'GAME_ENDED': () => ({inProgress: false, endTimestamp: DateTime.now().toISO(),}),
    };
    return buildState(buildMap, events);
}

export const endGame = async (gameId: string) => {
    const events = await fetchEventsById(gameId);
    return pipe(
        sortEvents,
        buildGame,
        validateGameEnded,
        storeEvent(writeToGameStore, getEndedEvent(gameId)),
    )(events);
}


(async function () {
    const result = await endGame('0ee4f667-209d-4df3-a31b-3bf0cec27008');
    console.log(result);
})();