import { cond } from "lodash/fp"
import {validators} from "./event/validator";
import {eventValidate}  from "./../../lib/event-validate"
import {writeToStore} from "./../../store/write-to-store";



const startGame = (event) => {
    writeToStore('game', {ka: 'ka'})
    writeToStore('game', {ka: 'ka'})
    writeToStore('game', {ka: 'ka'})
    writeToStore('game', {ka: 'ka'})
}

startGame({});