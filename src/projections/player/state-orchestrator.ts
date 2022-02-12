import {PLAYER_REGISTERED, PlayerRegisteredEvent} from "../../events/player/player-registerd/event/event";
import {
    PLAYER_NAME_FIXED,
    PlayerNameFixedEvent
} from "../../events/player/player-name-fixed/event/event";
import {PLAYER_LOST, PlayerLostEvent} from "../../events/player/player-lost/event/event";
import {PLAYER_TIED, PlayerTiedEvent} from "../../events/player/player-tied/event/event";
import {PLAYER_WON, PlayerWonEvent} from "../../events/player/player-won/event/event";
import {buildState} from "../../lib/helpers";

export const parsePlayerRegisteredEvent = (event: PlayerRegisteredEvent) => {
    const {data: {playerId, firstName, lastName, userId}} = event;
    return {
        playerInformation: {playerId, firstName, lastName, userId},
        statistics: {wins: 0, losses: 0, draws: 0}
    }
};
export const parsePlayerInfoChangedEvent = (event: PlayerNameFixedEvent) => {
    const {data: {playerId, firstName, lastName}} = event;
    return {
        playerId, firstName, lastName
    }
};
export const parsePlayerLossStatChangeEvent = (event: PlayerLostEvent, previousState) => {
    const {statistics: {losses: previousValue}} = previousState;
    const {statistics: previousStatistics} = previousState;
    return {statistics: {...previousStatistics, losses: previousValue + 1}};
};
export const parsePlayerDrawStatChangeEvent = (event: PlayerTiedEvent, previousState) => {
    const {statistics: {draws: previousValue}} = previousState;
    const {statistics: previousStatistics} = previousState;
    return {statistics: {...previousStatistics, draws: previousValue + 1}};
};
export const parsePlayerWinStatChangeEvent = (event: PlayerWonEvent, previousState) => {
    const {statistics: {wins: previousWins}} = previousState;
    const {statistics: previousStatistics} = previousState;
    return {statistics: {...previousStatistics, wins: previousWins + 1}};
};
export const orchestratePlayer = (events) => {
    const buildMap = {
        [PLAYER_REGISTERED]: parsePlayerRegisteredEvent,
        [PLAYER_NAME_FIXED]: parsePlayerInfoChangedEvent,
        [PLAYER_LOST]: parsePlayerLossStatChangeEvent,
        [PLAYER_WON]: parsePlayerWinStatChangeEvent,
        [PLAYER_TIED]: parsePlayerDrawStatChangeEvent,
    }
    return buildState(buildMap, events);
};