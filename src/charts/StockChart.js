import * as d3 from 'd3';
import ReactTooltip from 'react-tooltip';

import '../styles/charts.css';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { AxisRight } from './AxisRight';
import { CandlestickMarks } from './CandlestickMarks';
import { VolumeMarks } from './VolumeMarks';

const width = 1200;
const height = 600;
const margin = { top: 20, right: 80, bottom: 40, left: 80 };

const dataWindowSize = 130;
const dataWindowOffset = 0;

const yAxisLabelOffset = 60;

export const StockChart = () => {
    let data = useData();

    if (!data) {
        return <pre>Loading...</pre>;
    }

    const dataWindowEnd = data.length - dataWindowOffset;
    const dataWindowStart = dataWindowEnd - dataWindowSize;
    data = data.slice(dataWindowStart, dataWindowEnd);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleBand()
        .domain(d3.utcDay
            .range(data[0].date, +data[data.length - 1].date + 1)
            .filter(d => d.getUTCDay() !== 0 && d.getUTCDay() !== 6))
        .range([0, innerWidth])
        .padding(0.2);

    const yPriceScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.low), d3.max(data, d => d.high)])
        .rangeRound([innerHeight, 0])
        .nice();

    const yVolumeScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.volume))
        .rangeRound([innerHeight, 0])
        .nice();

    return (
        <>
            <svg width={width} height={height}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <AxisBottom
                        xScale={xScale}
                        innerWidth={innerWidth}
                        innerHeight={innerHeight}
                        axisOffset={0}
                    />
                    <AxisLeft
                        yScale={yPriceScale}
                        innerHeight={innerHeight}
                        axisOffset={-xScale.bandwidth() / 2}
                    />
                    <text
                        className='axis-label'
                        textAnchor='middle'
                        transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}
                    >
                        Price
                    </text>
                    <AxisRight
                        yScale={yVolumeScale}
                        innerWidth={innerWidth}
                        innerHeight={innerHeight}
                        axisOffset={xScale.bandwidth() / 2}
                    />
                    <text
                        className='axis-label'
                        textAnchor='middle'
                        transform={`translate(${innerWidth + yAxisLabelOffset},${innerHeight / 2}) rotate(90)`}
                    >
                        Volume
                    </text>
                    <VolumeMarks
                        data={data}
                        xScale={xScale}
                        yScale={yVolumeScale}
                        innerHeight={innerHeight}
                    />
                    <CandlestickMarks
                        data={data}
                        xScale={xScale}
                        yScale={yPriceScale}
                    />
                </g>
            </svg>
            <ReactTooltip id='mark-tooltip' place='right' effect='solid' html={true} />
        </>
    )
}