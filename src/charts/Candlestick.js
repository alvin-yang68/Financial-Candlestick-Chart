import * as d3 from 'd3';

import { AxisBottom } from './Axis/AxisBottom';
import { AxisLeft } from './Axis/AxisLeft';
import { AxisRight } from './Axis/AxisRight';
import { CandlestickMarks } from './Marks/CandlestickMarks';
import { VolumeMarks } from './Marks/VolumeMarks';

const margin = { top: 20, right: 80, bottom: 40, left: 80 };
const yAxisLabelOffset = 60;

export const Candlestick = ({ data, width, height }) => {
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
        .domain([0, d3.max(data, d => d.volume)])
        .rangeRound([innerHeight, 0])
        .nice();

    const getOnlyMonday = d => d.getUTCDay() === 1;

    return (
        <g transform={`translate(${margin.left},${margin.top})`}>
            <AxisBottom
                xScale={xScale}
                xLength={innerWidth}
                yOffset={innerHeight}
                filterCondition={getOnlyMonday}
            />
            <AxisLeft
                yScale={yPriceScale}
                yLength={innerHeight}
                xOffset={-xScale.bandwidth() / 2}
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
                yLength={innerHeight}
                xOffset={innerWidth + xScale.bandwidth() / 2}
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
    )
}