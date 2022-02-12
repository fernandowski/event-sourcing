import {Game as IGame} from '../../IGame';

const validateGameStatus = ({inProgress}: IGame) : string => (inProgress ? '' : 'Game has Already Ended.');

export const validators = [validateGameStatus];