let req =  new XMLHttpRequest();
let dataJSON = [];
let url1 = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/';
let url2 = url1 + 'global-temperature.json';
req.open('GET', url2, true);
req.send();
req.onload(() => {
  dataJSON = JSON.parse(req.responseText);
  graphDraw(jsonData);
});

const graphDraw = (data) => {
  
};
