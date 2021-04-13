export const VolumeMarks = ({ data, xScale, yScale, innerHeight }) => (
    data.map(d => (
        <rect
            className='volume-mark'
            key={d.volume}
            x={xScale(d.date) - xScale.bandwidth() / 2}
            y={yScale(d.volume)}
            width={xScale.bandwidth()}
            height={innerHeight - yScale(d.volume)}
        />
    ))
)