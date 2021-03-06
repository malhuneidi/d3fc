const data = [
    [0.1, 0.15],
    [0.2, 0.3],
    [0.4, 0.6],
    [0.8, 0.9]
];

const container = document.querySelector('d3fc-svg');

const xScale = d3.scaleLinear().domain([0, 1]);

const yScale = d3.scaleLinear().domain([0, 1]);

const horizontalBand = fc
    .annotationSvgBand()
    .xScale(xScale)
    .yScale(yScale)
    .fromValue(d => d[0])
    .toValue(d => d[1]);

const verticalBand = fc
    .annotationSvgBand()
    .orient('vertical')
    .xScale(xScale)
    .yScale(yScale)
    .fromValue(d => d[0])
    .toValue(d => d[1]);

const xAxis = d3.axisBottom(xScale);

const yAxis = d3.axisRight(yScale);

const xAxisJoin = fc.dataJoin('g', 'x-axis');

const yAxisJoin = fc.dataJoin('g', 'y-axis');

const svg = d3.select(container).select('svg');

d3.select(container)
    .on('draw', () => {
        svg.datum(data);
        svg.append('g').call(horizontalBand);
        svg.append('g').call(verticalBand);
    })
    .on('measure', () => {
        const { width, height } = event.detail;
        xScale.range([10, width - 30]);
        yScale.range([5, height - 20]);
        xAxisJoin(svg, d => [d])
            .attr('transform', `translate(0, ${height - 20})`)
            .call(xAxis);
        yAxisJoin(svg, d => [d])
            .attr('transform', `translate(${width - 30}, 0)`)
            .call(yAxis);
    });

container.requestRedraw();
