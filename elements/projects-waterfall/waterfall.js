'use strict';

Polymer({
  is: 'projects-waterfall',
  properties: {
    start: {
      type: String,
      notify: true,
      value: todaysDate
    },
    end: {
      type: String,
      notify: true,
      value: twoMonthsFromNow
    },
    data: {
      type: Array,
      value: getData
    }
  },
  getData: getData,
  configureVars: configureVars,
  drawChart: drawChart,
  nukeChart: nukeChart,
  ready: function() {
    let defaultStart = this.start;
    let defaultEnd   = this.end;
    let defaultData  = this.data;
    
    this.addEventListener('start-changed', dateChanged);
    this.addEventListener('end-changed', dateChanged);
    
    this.configureVars(defaultStart, defaultEnd, defaultData);
    this.drawChart();
  }
});


// Event Listeners
function dateChanged() {
  let newStart = this.start;
  let newEnd   = this.end;

  this.nukeChart();
  this.configureVars(newStart, newEnd, this.data);
  this.drawChart();
}

// Get Data from API Routes
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
  
  return mockData;
}


// D3 Config Vars
function configureVars(startDate, endDate, data) {
  const svgElement  = this.$.waterfall;
  
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

  // min is the start selection, max is the end selection
  const min = this.min = dateFormat.parse(startDate);
  const max = this.max = dateFormat.parse(endDate);

  // Pass the min and max dates, create our time scale
  this.timeScale = d3.time.scale().domain([min, max]).range([40, width - 40]);

  // Create a color scale for our bars
  this.colorScale = d3.scale.linear()
      .domain([0, data.length])
      .range(['#1199BF', '#12BF25'])
      .interpolate(d3.interpolateHcl);
}

// D3 Draw Chart
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
    // Could use dependency injection for these (./d3-waterfall.js)
    drawAxis(svgContainer, 0, 0, width, height, startDate, endDate, timeScale, timeFormat);
    drawBars(data, svgContainer, 50, 0, 0, 40, colorScale, timeScale, dateFormat, width, height);
  } else {
    console.log('Error, start date must be less than end date');
  }
}


// Remove the chart so we can redraw
function nukeChart() {
  let chart = this.$.waterfall;
  while (chart.firstChild) {
    chart.removeChild(chart.firstChild);
  }
}


// Date Helpers
function todaysDate() {
  var date = new Date();
  var dd    = date.getDate();
  var mm    = date.getMonth() + 1;
  var yyyy  = date.getFullYear();

  if (dd < 10) dd = '0' + dd
  if (mm < 10) mm = '0' + mm

  return yyyy + '-' + mm + '-' + dd;
}

function twoMonthsFromNow() {
  var date  = new Date();
  var mm    = date.getMonth() + 3;
  var today = todaysDate();
  var split = today.split('-');
  
  if (mm < 10) mm = '0' + mm;
  split[1] = mm;
  
  return split.join('-');
}