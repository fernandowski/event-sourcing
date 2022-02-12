import {cond, curry, orderBy, reduce, stubTrue} from "lodash/fp";
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
        const state = buildMap[type] ? buildMap[type](value, result) : {};
        return {...result, ...state};
    }, {}, events);
});

export const storeEvent = curry(
    (store, event, errors) => {
        return cond(
            [
                [(errors) => (errors.length > 0), () => ({status: 'NOT_VALID', errors})],
                [stubTrue, () => (store(event))]
            ]
        )(errors);
    }
);