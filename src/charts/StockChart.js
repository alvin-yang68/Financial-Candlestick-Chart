import { useState } from 'react';
import ReactTooltip from 'react-tooltip';

import '../styles/charts.css';
import { useData } from './useData';
import { Candlestick } from './Candlestick'
import { Brush } from './Brush'

const totalWidth = 1200;
const totalHeight = 750;
const seperationRatio = 0.8;
const brushSize = 130;

export const StockChart = () => {
    const data = useData();
    const [brushExtent, setBrushExtent] = useState();

    if (!data) {
        return <pre>Loading...</pre>;
    }

    const initialBrush = [
        data[data.length - brushSize].date,
        data[data.length - 1].date
    ];

    const slicedData = brushExtent ?
        data.filter(d => (d.date > brushExtent[0]) && (d.date < brushExtent[1])) :
        data.filter(d => (d.date > initialBrush[0]) && (d.date < initialBrush[1]));

    return (
        <>
            <svg width={totalWidth} height={totalHeight}>
                <Candlestick
                    data={slicedData}
                    width={totalWidth}
                    height={totalHeight * seperationRatio}
                />
                <g transform={`translate(0,${totalHeight * seperationRatio})`}>
                    <Brush
                        data={data}
                        width={totalWidth}
                        height={totalHeight * (1 - seperationRatio)}
                        initialBrush={initialBrush}
                        setBrushExtent={setBrushExtent}
                    />
                </g>
            </svg>
            <ReactTooltip id='mark-tooltip' place='right' effect='solid' html={true} />
        </>
    )
}