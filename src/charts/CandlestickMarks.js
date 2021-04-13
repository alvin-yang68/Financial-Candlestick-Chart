import { utcFormat, format, schemeSet1 } from 'd3';

export const CandlestickMarks = ({ data, xScale, yScale }) => {
    const formatDate = utcFormat('%B %-d, %Y');
    const formatValue = format('.2f');
    const formatString = format('.3s');

    return data.map(d => (
        <g className='candlestick-mark' key={d.date} transform={`translate(${xScale(d.date)},0)`}>
            <line
                y1={yScale(d.low)}
                y2={yScale(d.high)}
            />
            <line
                y1={yScale(d.open)}
                y2={yScale(d.close)}
                strokeWidth={xScale.bandwidth()}
                stroke={
                    d.open > d.close ? schemeSet1[0]
                        : d.close > d.open ? schemeSet1[2]
                            : schemeSet1[8]
                }
                data-tip={
                    `<b>${formatDate(d.date)}</b><br />` +
                    `Open: $${formatValue(d.open)}<br />` +
                    `Close: $${formatValue(d.close)}<br />` +
                    `Low: $${formatValue(d.low)}<br />` +
                    `High: $${formatValue(d.high)}<br />` +
                    `Volume: ${formatString(d.volume)}`
                }
                data-for='mark-tooltip'
            />
        </g>
    ))
}