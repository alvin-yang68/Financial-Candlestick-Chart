export const AxisBottom = ({ xScale, filterCondition, innerHeight, tickFormat, axisOffset = 12 }) => (
    xScale.domain()
        .filter(filterCondition)
        .map(tickValue => (
            <g className='axis' key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
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
)