import {gameInitializedEvent, GAME_TYPE} from '../event/event'

const validateGameType = ({data: { gameType }}: gameInitializedEvent) : string  => (gameType === GAME_TYPE ? '' : 'Not a valid game Type.');
const validateNumberOfPlayers = ({data: {maxPlayers}}: gameInitializedEvent) : string => (maxPlayers < 4 ? '' : 'Max Number of Players Allowed is 3.');

export const validators = [validateGameType, validateNumberOfPlayers];