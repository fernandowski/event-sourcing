import {pipe, curry, cond, stubTrue} from "lodash/fp"
import {writeToGameStore} from "../../store/game";
import {getEvent} from "./event/event";
import {validateGameStarted} from "./validation";

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

export const startGame = ({maxPlayers, gameType}) => {
    const gameStartedEvent = getEvent(gameType, maxPlayers);
    return pipe(
        validateGameStarted,
        storeEvent(writeToGameStore, gameStartedEvent),
    )(gameStartedEvent)
}

console.log(startGame({maxPlayers: 2, gameType: 'FREE_FOR_ALL'}));