import {IValidator} from "../../../lib/IValidator";
import {GameStartedEvent, GAME_STARTED, GAME_TYPE} from '../event/event'

const validateGameType = ({data: { gameType }}: GameStartedEvent) => (gameType === GAME_TYPE ? null : 'Not a valid game Type');
const validateNumberOfPlayers = ({data: {maxPlayers}}: GameStartedEvent) => (maxPlayers < 4 ? null : 'Game is Full');

const playerValidator: IValidator = {
    validate: validateNumberOfPlayers
}

const gameTypeValidator: IValidator = {
    validate: validateGameType
}

export const validators = [playerValidator, gameTypeValidator];