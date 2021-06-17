import fs from 'fs';
import { cond } from 'lodash/fp'

export const getDataSink = (storeName : string ) => {
    return cond(
        [
            [(storeName) => (storeName === 'game'), () => (`${__dirname}/game.txt`)],
            [(storeName) => (storeName === 'player'), () => (`${__dirname}/players.txt`)]
        ]
    )(storeName)
}

export const writeToStore = (storeName : string, event : Record<any, any>) => {
    const dataSink = getDataSink(storeName)
    fs.appendFileSync(dataSink, JSON.stringify(event))
    fs.appendFileSync(dataSink, '\n')
}