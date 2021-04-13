import { format } from 'd3';

export const AxisLeft = ({ yScale, innerHeight, axisOffset }) => {
    const tickFormat = format('$~f');

    const ticks = yScale.ticks().map(tickValue => (
        <g
            className='axis'
            key={tickValue}
            transform={`translate(0,${yScale(tickValue)})`}
        >
            <line
                className='tick'
                x1={axisOffset - 6}
                x2={axisOffset}
            />
            <text
                style={{ textAnchor: 'end' }}
                x={axisOffset - 12}
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
                x1={axisOffset}
                x2={axisOffset}
                y2={innerHeight}
            />
        </>
    )
}