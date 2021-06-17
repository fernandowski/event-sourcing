import {curry} from 'lodash/fp'
import {IValidator} from "../../../lib/IValidator";
import {GameStartedEvent, GAME_STARTED} from '../event/event'

const validateGameType = ({type}: GameStartedEvent) => (type === GAME_STARTED ? null : 'Not a valid game Type');
const validateNumberOfPlayers = ({data: {maxPlayers}}: GameStartedEvent) => (maxPlayers < 4 ? null : 'Game is Full');

const playerValidator: IValidator = {
    validate: validateNumberOfPlayers
}

const gameTypeValidator: IValidator = {
    validate: validateGameType
}

export const validators = [playerValidator, gameTypeValidator];