export const AxisLeft = ({ yScale, innerWidth, tickFormat, axisOffset = -12 }) => (
    yScale.ticks().map(tickValue => (
        <g className='axis' key={tickValue} transform={`translate(0,${yScale(tickValue)})`}>
            <line x1={axisOffset} x2={innerWidth} />
            <line className='tick' x1={axisOffset - 6} x2={axisOffset} />
            <text
                style={{ textAnchor: 'end' }}
                x={axisOffset - 12}
                dy=".32em"
            >
                {tickFormat(tickValue)}
            </text>
        </g>
    ))
)