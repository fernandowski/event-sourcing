import {orderBy, reduce, curry} from "lodash/fp";
import {DateTime} from 'luxon';

export const sortEvents = (events) => {
    return orderBy(
        (event) => ((DateTime.fromISO(event.eventTime))),
        'asc',
        events
    );
}

export const buildState = curry((buildMap, events: any[]) => {
    return reduce((result, value) => {
        const {type = null} = value;
        const state = buildMap[type] ? buildMap[type](value) : {};
        return {...result, ...state};
    }, {}, events)
});