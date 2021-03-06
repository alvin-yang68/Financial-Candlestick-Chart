import { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

import '../styles/charts.css';
import { useData } from './useData';
import { Main } from './Main'
import { Brush } from './Brush'

export const StockChart = ({
    specs: {
        totalWidth,
        totalHeight,
        seperationRatio,
        brushSpecs,
        mainChartSpecs
    }
}) => {
    const data = useData();
    const [brushExtent, setBrushExtent] = useState();

    useEffect(() => {
        ReactTooltip.rebuild();
    });

    if (!data) {
        return <pre>Loading...</pre>;
    }

    mainChartSpecs = {
        ...mainChartSpecs,
        width: totalWidth,
        height: totalHeight * seperationRatio
    }

    brushSpecs = {
        ...brushSpecs,
        width: totalWidth,
        height: totalHeight * (1 - seperationRatio)
    }

    const initialBrushExtent = [
        data[data.length - brushSpecs.brushSize].date,
        data[data.length - 1].date
    ];

    const slicedData = brushExtent ?
        data.filter(d => (d.date > brushExtent[0]) && (d.date < brushExtent[1])) :
        data.filter(d => (d.date > initialBrushExtent[0]) && (d.date < initialBrushExtent[1]));

    return (
        <>
            <svg width={totalWidth} height={totalHeight}>
                <Main
                    data={slicedData}
                    specs={mainChartSpecs}
                />
                <g transform={`translate(0,${totalHeight * seperationRatio})`}>
                    <Brush
                        data={data}
                        specs={brushSpecs}
                        initialBrushExtent={initialBrushExtent}
                        setBrushExtent={setBrushExtent}
                    />
                </g>
            </svg>
            <ReactTooltip id='mark-tooltip' place='right' effect='solid' html={true} />
        </>
    )
}