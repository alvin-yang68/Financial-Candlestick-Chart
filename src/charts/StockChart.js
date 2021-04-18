import ReactTooltip from 'react-tooltip';

import '../styles/charts.css';
import { useData } from './useData';
import { Candlestick } from './Candlestick'

const width = 1200;
const height = 750;

const dataWindowSize = 130;
const dataWindowOffset = 0;

export const StockChart = () => {
    let data = useData();

    if (!data) {
        return <pre>Loading...</pre>;
    }

    const dataWindowEnd = data.length - dataWindowOffset;
    const dataWindowStart = dataWindowEnd - dataWindowSize;

    const slicedData = data.slice(dataWindowStart, dataWindowEnd);

    return (
        <>
            <svg width={width} height={height}>
                <Candlestick data={slicedData} width={width} height={height * 0.8} />
            </svg>
            <ReactTooltip id='mark-tooltip' place='right' effect='solid' html={true} />
        </>
    )
}