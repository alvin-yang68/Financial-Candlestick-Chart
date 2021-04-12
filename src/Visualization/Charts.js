import * as d3 from 'd3';

import '../styles/charts.css';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { CandlestickMarks } from './CandlestickMarks'

const width = 1200;
const height = 600;
const margin = { top: 20, right: 30, bottom: 40, left: 80 };

const dataWindowSize = 130;
const dataWindowOffset = 0;

export const Charts = () => {
    let data = useData();

    if (!data) {
        return <pre>Loading...</pre>;
    }

    const dataWindowEnd = data.length - dataWindowOffset;
    const dataWindowStart = dataWindowEnd - dataWindowSize;
    data = data.slice(dataWindowStart, dataWindowEnd);

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xScale = d3.scaleBand()
        .domain(d3.utcDay
            .range(data[0].date, +data[data.length - 1].date + 1)
            .filter(d => d.getUTCDay() !== 0 && d.getUTCDay() !== 6))
        .range([0, innerWidth])
        .padding(0.2);

    const yPriceScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.low), d3.max(data, d => d.high)])
        .rangeRound([innerHeight, 0]);

    const onlyMonday = d => d.getUTCDay() === 1;

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>
                <AxisBottom
                    xScale={xScale}
                    filterCondition={onlyMonday}
                    innerHeight={innerHeight}
                    tickFormat={d3.utcFormat('%-m/%-d')}
                />
                <AxisLeft
                    yScale={yPriceScale}
                    innerWidth={innerWidth}
                    tickFormat={d3.format('$~f')}
                />
                <CandlestickMarks
                    data={data}
                    xScale={xScale}
                    yScale={yPriceScale}
                    formatDate={d3.utcFormat('%B %-d, %Y')}
                    formatValue={d3.format('.2f')}
                />
            </g>
        </svg>
    )
}