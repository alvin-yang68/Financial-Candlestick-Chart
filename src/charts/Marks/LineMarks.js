import { area, curveNatural } from 'd3';

export const LineMarks = ({ data, xScale, yScale }) => (
    <path
        className='line-mark'
        d={area()
            .x(d => xScale(d.date))
            .y0(yScale(0))
            .y1(d => yScale(d.close))
            .curve(curveNatural)(data)}
    />
)