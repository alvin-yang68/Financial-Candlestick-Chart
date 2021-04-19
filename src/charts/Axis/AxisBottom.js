export const AxisBottom = ({ xScale, xLength, filterCondition, bandwidthOffset = 0, yOffset = 0, axisLine = false, tickFormat }) => {
    const ticks = xScale.domain()
        .filter(filterCondition)
        .map(tickValue => (
            <g
                className='axis'
                key={tickValue}
                transform={`translate(${xScale(tickValue)},0)`}
            >
                {axisLine && <line y2={yOffset} />}
                <line
                    className='tick'
                    y1={yOffset}
                    y2={yOffset + 6}
                />
                <text
                    style={{ textAnchor: 'middle' }}
                    dy=".71em"
                    y={yOffset + 14}
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
                y1={yOffset}
                y2={yOffset}
                x1={-bandwidthOffset}
                x2={xLength + bandwidthOffset}
            />
        </>
    )
}