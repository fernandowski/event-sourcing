import {writeToStore, getEventsByGameId} from "../store-lib";

export const writeToGameStore = writeToStore('game');

export const fetchEventsById = (id: string) => {
    return getEventsByGameId('game', (data) => {
        try {
            const {data: {gameId}} = JSON.parse(data.replace(/\r?\n/g, ''));
            return gameId === id;
        } catch (e) {
            console.log('Bad Event Cannot parse');
            return false;
        }
    })
}