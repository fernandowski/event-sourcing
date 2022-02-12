import {writeToStore, getEvents} from "../store-lib";

export const writeToGameStore = writeToStore('game');

export const fetchEventsById = (id: string) : boolean => {
    return getEvents('game', (data) => {
        try {
            const {data: {gameId}} = JSON.parse(data.replace(/\r?\n/g, ''));
            return gameId === id;
        } catch (e) {
            return false;
        }
    });
}