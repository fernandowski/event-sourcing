import {pipe} from 'lodash/fp';
import {fetchEventsById, writeToGameStore} from "../../../store/game";
import {buildState, sortEvents, storeEvent} from "../../../lib/helpers";
import {DateTime} from 'luxon';
import {validateGameStopped} from "./validation";
import {getGameStoppedEvent} from './event/event'
import {GAME_INITIALIZED} from "../game-initialized/event/event";
import {GAME_STOPPED} from "./event/event";
import * as events from "events";

const parseGameInitializedEvent = ({data: {gameId, maxPlayers,}, eventTime}) => ({
    id: gameId,
    maxPlayers,
    currentPlayers: 0,
    startTimestamp: eventTime,
    inProgress: true,
});

const parseGameStoppedEvent = ({inProgress: false, endTimestamp: DateTime.now().toISO()});

export const buildGame = (events: events) => {
    const buildMap = {[GAME_INITIALIZED]: parseGameInitializedEvent, [GAME_STOPPED]: parseGameStoppedEvent}
    return buildState(buildMap, events);
}

export const gameStopped = (gameId: string) => {
    const events = fetchEventsById(gameId);
    return pipe(
        sortEvents,
        buildGame,
        validateGameStopped,
        storeEvent(writeToGameStore, getGameStoppedEvent(gameId)),
    )(events);
}