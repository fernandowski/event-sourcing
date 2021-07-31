import {IValidator} from "../../../lib/IValidator";
import {Game as IGame} from '../../IGame';

const validateGameStatus = ({inProgress}: IGame) => (inProgress ? null : 'Game has Already Ended.');

const validateStatus: IValidator = {
    validate: validateGameStatus
}

export const validators = [validateStatus];