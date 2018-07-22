let req =  new XMLHttpRequest();
let dataJSON = [];
let url1 = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/';
let url2 = url1 + 'global-temperature.json';
req.open('GET', url2, true);
req.send();
req.onload = () => {
  dataJSON = JSON.parse(req.responseText);
  graphDraw(dataJSON);
};

const graphDraw = (data) => {
  console.log(data);
  let w = 1140;
  let h = 540;
  const padding = 100;

  //the x and y scales
  let xScale = d3.scaleLinear();
  let yScale = d3.scaleTime();
  xScale.domain([d3.min((d) => d.year), d3.max((d) => d.year)]).range([0, w]);
  yScale.domain([d3.min((d) => d.month), d3.max((d) => d.month)]).range([0, h]);

  //appending the graph components
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    

  let svg = d3.select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h)
    .attr('class', 'containerSVG');


};
