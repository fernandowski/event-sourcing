import fs from 'fs';
import {Transform} from "stream";
import {cond, pipe, forEach, curry} from 'lodash/fp'
import {map, compose, streamAsPromise, filter} from "streamfp"
import ReadableStream = NodeJS.ReadableStream;

export const getDataSink = (storeName: string): string => {
    return cond(
        [
            [(storeName) => (storeName === 'game'), () => (`${__dirname}/game.txt`)],
            [(storeName) => (storeName === 'player'), () => (`${__dirname}/players.txt`)]
        ]
    )(storeName)
}

export const writeToStore = curry((storeName: string, event: Record<any, any>) => {
    const dataSink = getDataSink(storeName)
    fs.appendFileSync(dataSink, JSON.stringify(event))
    fs.appendFileSync(dataSink, '\n')
    return event;
});

export const crateDataSinkStream = (storeName: string): ReadableStream => {
    return fs.createReadStream(getDataSink(storeName)).pipe(new Transform({
        objectMode: true,
        transform(chunk: any, encoding: BufferEncoding, callback: () => any) {
            forEach((value) => {
                this.push(value);
            }, (chunk.toString().split(/\r?\n/)));
            callback();
        }
    }));
}

export const getEventsByGameId = curry((storeName: string, filterCB: (event: any) => boolean) => {
    const stream = compose(
        filter(filterCB),
        map((data) => (JSON.parse(data))),
    )(getStore(storeName));
    return streamAsPromise(stream);
});

export const getStore = (storeName: string): ReadableStream => {
    return pipe(
        crateDataSinkStream
    )(storeName);
}

