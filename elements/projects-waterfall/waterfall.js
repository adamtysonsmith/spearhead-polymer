'use strict';

Polymer({
  is: 'projects-waterfall',
  getData: getData,
  configureVars: configureVars,
  drawChart: drawChart,
  ready: function() {
    this.getData()
    this.configureVars()
    this.drawChart()
  }
});


function getData() {
  // @todo
  // Hit a route to retreive all the projects
  // using iron-ajax
  
  var mockData = [
    {
      name: 'Manhattan Project',
      startDate: '2016-01-15',
      dueDate: '2016-02-15'
    },
    {
      name: 'Project Pat',
      startDate: '2016-02-01',
      dueDate: '2016-02-15'
    },
    {
      name: 'In My Projects',
      startDate: '2016-01-01',
      dueDate: '2016-01-31'
    }
  ];
  
  // Set the data on our instance
  this.data = mockData;
}



function configureVars() {
  // Set our required instance variables
  // Maybe these should be passed in, data esp
  const svgElement = this.$.waterfall;
  const data = this.data;
  
  // D3 Layout variables
  const width       = this.width       = 1200;
  const height      = this.height      = 400;
  const sidePadding = this.sidePadding = 0;
  const topPadding  = this.topPadding  = 0;

  // Create a selection for the svg element
  this.svgContainer = d3.select(svgElement)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + width + ' ' + height)
      .attr('preserveAspectRatio','xMidYMid')
      .attr("class", "svg-container");

  // Format the dates and times
  const dateFormat = this.dateFormat = d3.time.format('%Y-%m-%d');
  const timeFormat = this.timeFormat = d3.time.format('%b %e, %Y');
  
  // We trim off the current day and append the first or last day of the month roughly
//  this.startMonth = start.slice(0, 8) + '01';
//  this.endMonth = end.slice(0, 8) + '31';
  const startMonth = this.startMonth = '2016-01-01'
  const endMonth   = this.endMonth   = '2016-03-31';

  // min is the start selection, max is the end selection
  const min = this.min = dateFormat.parse(startMonth);
  const max = this.max = dateFormat.parse(endMonth);

  // Pass the min and max dates, create our time scale
  this.timeScale = d3.time.scale().domain([min, max]).range([40, width - 40]);

  // Create a color scale for our bars
  this.colorScale = d3.scale.linear()
      .domain([0, data.length])
      .range(['#1199BF', '#12BF25'])
      .interpolate(d3.interpolateHcl);
}



function drawChart() {
  // draw chart using our instance vars
  let svgContainer = this.svgContainer;
  let width        = this.width;
  let height       = this.height;
  let timeScale    = this.timeScale;
  let colorScale   = this.colorScale;
  let timeFormat   = this.timeFormat;
  let dateFormat   = this.dateFormat;
  let startDate    = this.min;
  let endDate      = this.max;
  let data         = this.data;
  
  if(startDate < endDate) {
    drawAxis(svgContainer, 0, 0, width, height, startDate, endDate, timeScale, timeFormat);
    drawBars(data, svgContainer, 50, 0, 0, 40, colorScale, timeScale, dateFormat, width, height);
  } else {
    console.log('Error, start data must be less than end date');
  }
}