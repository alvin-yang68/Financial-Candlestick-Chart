import { schemeSet1 } from 'd3';

export const CandlestickMarks = ({ data, xScale, yScale, formatDate, formatValue }) => (
    data.map(d => (
        <g className='candlestickMark' key={d.date} transform={`translate(${xScale(d.date)},0)`}>
            <line
                id='shadow'
                y1={yScale(d.low)}
                y2={yScale(d.high)}
            />
            <line
                id='realBody'
                y1={yScale(d.open)}
                y2={yScale(d.close)}
                strokeWidth={xScale.bandwidth()}
                stroke={d.open > d.close ? schemeSet1[0]
                    : d.close > d.open ? schemeSet1[2]
                        : schemeSet1[8]}
            />
            <title>
                {`${formatDate(d.date)}\n` +
                    `Open: ${formatValue(d.open)}\n` +
                    `Close: ${formatValue(d.close)}\n` +
                    `Low: ${formatValue(d.low)}\n` +
                    `High: ${formatValue(d.high)}`}
            </title>
        </g>
    ))
)