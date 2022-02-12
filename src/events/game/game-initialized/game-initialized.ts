import {pipe} from "lodash/fp"
import {writeToGameStore} from "../../../store/game";
import {getGameStoppedEvent, gameInitializedEvent} from "./event/event";
import {validateGameInitialized} from "./validation";
import {storeEvent} from "../../../lib/helpers";

export const gameInitialized = ({maxPlayers, gameType}) : gameInitializedEvent=> {
    const gameStartedEvent = getGameStoppedEvent(gameType, maxPlayers);
    return pipe(
        validateGameInitialized,
        storeEvent(writeToGameStore, gameStartedEvent),
    )(gameStartedEvent)
}