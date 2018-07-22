let req =  new XMLHttpRequest();
let dataJSON = [];
let url1 = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/';
let url2 = url1 + 'global-temperature.json';
req.open('GET', url2, true);
req.send();
req.onload = () => {
  let monthDate;
  let dataJSON = JSON.parse(req.responseText);
  graphDraw(dataJSON.monthlyVariance);
};

const graphDraw = (data) => {
  console.log(data);
  const w = 1052;
  const h = 600;
  const margin = { left: 100, top: 30, right: 30, bottom: 60 };
  const minYear = d3.min(data, (d) => d.year);
  const colorRange = ['#000066', '#0039e6', '#00ace6', '#80dfff', '#e6f9ff',
   '#ffffb3', ' #ffcc00', '#ffbf80', '#ff7733', '#ff3300', '#990000',
 ];
  const rectHeight = 50;
  const rectWidth = 4;

  //the x and y scales
  const xScale = d3.scaleLinear();
  const yScale = d3.scaleBand();
  xScale.domain([d3.min(data, (d) => d.year), d3.max(data, (d) => d.year)])
    .range([0, w]);
  yScale.domain(['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December',
  ])
    .range([0, h]);

  //colour scale
  const colors = d3.scaleQuantize()
    .domain([d3.min(data, (d) => d.variance), d3.max(data, (d) => d.variance)])
    .range(colorRange);

  const svg = d3.select('body')
    .append('svg')
    .attr('width', w + margin.left + margin.right)
    .attr('height', h + margin.top + margin.bottom)
    .attr('class', 'containerSVG');

  //appending the graph components
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d) => margin.left + (d.year - minYear) * rectWidth)
    .attr('y', (d) => margin.top + (d.month - 1) * rectHeight)
    .attr('height', rectHeight)
    .attr('width', rectWidth)
    .attr('fill', (d) => colors(d.variance));

  //axes
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);
  svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top + h})`)
    .call(xAxis.tickFormat(d3.format('d')));
  svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .call(yAxis);

  //appending the labels for the two axes
  svg.append('text')
    .attr('transform', `translate(${margin.left / 4}, ${h / 2 + margin.top}) rotate(-90)`)
    .text('Months');
  svg.append('text')
    .attr('transform', `translate(${margin.left + w / 2},
      ${h + margin.top + margin.bottom / 1.66})`)
    .text('Years');

  //legend
  const legHeight = 30;
  const numberColors = colorRange.length;
  const svgLegend = d3.select('body')
    .append('svg')
    .attr('width', legHeight * numberColors)
    .attr('height', legHeight * 2)
    .attr('class', 'svgLegend')
    .attr('id', 'legend');

  //elements of the legend
  svgLegend.selectAll('rect')
    .data(colorRange)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * legHeight)
    .attr('y', 0)
    .attr('width', legHeight)
    .attr('height', legHeight)
    .style('fill', (d) => d)
    .style('stroke', 'black');

  //two one pixel height rects to extend the scale left and right
  svgLegend.append('rect')
    .attr('x', 0)
    .attr('y', legHeight)
    .attr('height', 1)
    .attr('width', legHeight)
    .style('fill', 'black');
  svgLegend.append('rect')
    .attr('x', legHeight * (numberColors - 1))
    .attr('y', legHeight)
    .attr('height', 1)
    .attr('width', legHeight)
    .style('fill', 'black');

  //scale for the legend
  let legendScale = d3.scalePoint();
  legendScale.domain([2.8, 3.9, 5.0, 6.1, 7.2, 8.3, 9.5, 10.6, 11.7, 12.8])
    .range([0, legHeight * (numberColors - 2)]);

  //axis for legendScal
  let legendAxis = d3.axisBottom(legendScale);
  svgLegend.append('g')
    .attr('transform', `translate(${legHeight - 1}, ${legHeight})`)
    .call(legendAxis);
};
