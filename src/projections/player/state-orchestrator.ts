import {PLAYER_REGISTERED, PlayerRegisteredEvent} from "../../events/player/player-registerd/event/event";
import {
    PLAYER_NAME_FIXED,
    PlayerNameFixedEvent
} from "../../events/player/player-name-fixed/event/event";
import {PLAYER_LOST, PlayerLostEvent} from "../../events/player/player-lost/event/event";
import {PLAYER_TIED, PlayerTiedEvent} from "../../events/player/player-tied/event/event";
import {PLAYER_WON, PlayerWonEvent} from "../../events/player/player-won/event/event";
import {buildState} from "../../lib/helpers";

export type playerInfo = { playerId, firstName, lastName, userId }
export type PlayerStatistics = { wins, losses, draws }

export type Player = {
    playerInformation: playerInfo,
    statistics: PlayerStatistics,
}

export const parsePlayerRegisteredEvent = (event: PlayerRegisteredEvent): Player => {
    const {data: {playerId, firstName, lastName, userId}} = event;
    return {
        playerInformation: {playerId, firstName, lastName, userId},
        statistics: {wins: 0, losses: 0, draws: 0}
    }
};
export const parsePlayerInfoChangedEvent = (event: PlayerNameFixedEvent): { playerId, firstName, lastName } => {
    const {data: {playerId, firstName, lastName}} = event;
    return {
        playerId, firstName, lastName
    }
};

export const parsePlayerLossStatChangeEvent = (event: PlayerLostEvent, previousState: Player): { statistics: { losses } } => {
    const {statistics: {losses: previousValue}} = previousState;
    const {statistics: previousStatistics} = previousState;
    return {statistics: {...previousStatistics, losses: previousValue + 1}};
};
export const parsePlayerDrawStatChangeEvent = (event: PlayerTiedEvent, previousState: Player): { statistics: { draws } } => {
    const {statistics: {draws: previousValue}} = previousState;
    const {statistics: previousStatistics} = previousState;
    return {statistics: {...previousStatistics, draws: previousValue + 1}};
};
export const parsePlayerWinStatChangeEvent = (event: PlayerWonEvent, previousState: Player): { statistics: { wins } } => {
    const {statistics: {wins: previousWins}} = previousState;
    const {statistics: previousStatistics} = previousState;
    return {statistics: {...previousStatistics, wins: previousWins + 1}};
};
export const orchestratePlayer = (events : [PlayerLostEvent | PlayerNameFixedEvent | PlayerWonEvent | PlayerTiedEvent, PlayerRegisteredEvent]) : Player=> {
    const buildMap = {
        [PLAYER_REGISTERED]: parsePlayerRegisteredEvent,
        [PLAYER_NAME_FIXED]: parsePlayerInfoChangedEvent,
        [PLAYER_LOST]: parsePlayerLossStatChangeEvent,
        [PLAYER_WON]: parsePlayerWinStatChangeEvent,
        [PLAYER_TIED]: parsePlayerDrawStatChangeEvent,
    }
    return buildState(buildMap, events);
};