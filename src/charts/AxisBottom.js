import { utcFormat } from 'd3';

export const AxisBottom = ({ xScale, innerWidth, innerHeight, axisOffset }) => {
    const tickFormat = utcFormat('%-m/%-d');

    const onlyMonday = d => d.getUTCDay() === 1;

    const ticks = xScale.domain()
        .filter(onlyMonday)
        .map(tickValue => (
            <g
                className='axis'
                key={tickValue}
                transform={`translate(${xScale(tickValue)},0)`}
            >
                <line y2={innerHeight + axisOffset} />
                <line
                    className='tick'
                    y1={innerHeight + axisOffset}
                    y2={innerHeight + axisOffset + 6}
                />
                <text
                    style={{ textAnchor: 'middle' }}
                    dy=".71em"
                    y={innerHeight + axisOffset + 14}
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
                y1={innerHeight + axisOffset}
                y2={innerHeight + axisOffset}
                x1={-xScale.bandwidth() / 2}
                x2={innerWidth + xScale.bandwidth() / 2}
            />
        </>
    )
}