import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/alvin-yang68/825378ee22558f0ced78a2ca74c931a7/raw/AAPLStockHistory.csv'

export const useData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const row = d => {
            d.date = new Date(d.date);
            d.volume = +d.volume;
            d.open = +d.open;
            d.close = +d.close;
            d.high = +d.high;
            d.low = +d.low;
            d.eventTitle = Math.random() < 0.05 ? 'This is an event' : null;
            d.eventCallback = () => console.log('Hello world');
            return d;
        }
        csv(csvUrl, row).then(setData);
    }, [])

    return data;
}