import { format } from 'd3';

export const AxisRight = ({ yScale, innerWidth, innerHeight, axisOffset }) => {
    const tickFormat = format('~s');

    const ticks = yScale.ticks().map(tickValue => (
        <g
            className='axis'
            key={tickValue}
            transform={`translate(${innerWidth},${yScale(tickValue)})`}
        >
            <line
                className='tick'
                x1={axisOffset + 6}
                x2={axisOffset}
            />
            <text
                style={{ textAnchor: 'start' }}
                x={axisOffset + 12}
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
                x1={innerWidth + axisOffset}
                x2={innerWidth + axisOffset}
                y2={innerHeight}
            />
        </>
    )
}