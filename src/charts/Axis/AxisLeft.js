import { format } from 'd3';

const tickFormat = format('$~f');

export const AxisLeft = ({ yScale, yLength, xOffset }) => {
    const ticks = yScale.ticks().map(tickValue => (
        <g
            className='axis'
            key={tickValue}
            transform={`translate(0,${yScale(tickValue)})`}
        >
            <line
                className='tick'
                x1={xOffset - 6}
                x2={xOffset}
            />
            <text
                style={{ textAnchor: 'end' }}
                x={xOffset - 12}
                dy=".32em"
            >
                {tickFormat(tickValue)}
            </text>
        </g>
    ))

    return (
        <>
            {ticks}
            <line
                className='axis-border'
                x1={xOffset}
                x2={xOffset}
                y2={yLength}
            />
        </>
    )
}