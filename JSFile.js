let req =  new XMLHttpRequest();
let dataJSON = [];
let url1 = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/';
let url2 = url1 + 'global-temperature.json';
req.open('GET', url2, true);
req.send();
req.onload = () => {
  let monthDate;
  let dataJSON = JSON.parse(req.responseText);
  let newData = dataJSON.monthlyVariance.reduce((acc, item) => {
    monthDate = new Date('1999-01-07');
    monthDate.setMonth(item.month - 1);
    // console.log(monthDate);
    return acc.concat({
      ...item,
      month_date: monthDate,
    });
  }, []);
  console.log(newData);
  graphDraw(newData);
};

const graphDraw = (data) => {
  console.log(data);
  const w = 1052;
  const h = 600;
  const margin = { left: 70, top: 30, right: 30, bottom: 30 };
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

  //legend
  const legHeight = 30;
  const numberColors = colorRange.length;
  const svgLegend = d3.select('body')
    .append('svg')
    .attr('width', legHeight * numberColors)
    .attr('height', legHeight * 2)
    .attr('class', 'svgLegend');

  svgLegend.selectAll('rect')
    .data(colorRange)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * legHeight)
    .attr('y', 0)
    .attr('width', legHeight)
    .attr('height', legHeight)
    .style('fill', (d) => d);

  let legendScale = d3.scaleBand();
  legendScale.domain([2.8, 3.9, 5.0, 6.1, 7.2, 8.3, 9.5, 10.6, 11.7, 12.8])
    .range([0, legHeight * (numberColors - 2)]);

  //axis for legendScal
  let legendAxis = d3.axisBottom(legendScale);
  svgLegend.append('g')
    .attr('transform', `translate(${legHeight}, ${legHeight})`)
    .call(legendAxis);
};
