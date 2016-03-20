///////////////////////////////////////////////
// D3 Waterfall Visualization
///////////////////////////////////////////////

// Draw the timeline axis and gridlines
var drawAxis = function(svgContainer, sidePadding, topPadding, width, height, min, max, timeScale, timeFormat) {

    var interval = d3.time.day;
    var tickWidth = 100; // Set maximum tick width
    var maxTicks = width / tickWidth;
    var skip = Math.ceil(interval.range(min, max).length / maxTicks); // Reference our dynamic min and max
    
    var xAxis = d3.svg.axis()
        .scale(timeScale)
        .orient('bottom')
        .tickValues(interval.range(min, max).filter(function(d, i) {
            return !(i % skip);
        }))
        .tickSize(-height + topPadding + 20, 0, 0)
        .tickFormat(timeFormat);
    
    var ticks = svgContainer.append('g')
        .attr('class', 'grid')
        .attr('transform', 'translate(' + sidePadding + ', ' + (height - 50) + ')')
        .call(xAxis)
        .selectAll('text')  
        .style('text-anchor', 'middle')
        .attr('fill', '#000')
        .attr('stroke', 'none')
        .attr('font-size', 10);
    
    return ticks;
}


// Draw the bars and labels
function drawBars(data, svgContainer, theGap, theTopPad, theSidePad, theBarHeight, theColorScale, timeScale, dateFormat, w, h) {
    
    // Append our bars
    var barGroup = svgContainer.append('g')
        .selectAll('rect')
        .data(data)
        .enter();

   var bars = barGroup.append('rect')
        .classed('project-bar', true)
        .attr('data-project', function(d, i) {
            return i;
        })
        .attr('rx', 3)
        .attr('ry', 3)
        .attr('x', function(d){
            return timeScale(dateFormat.parse(d.startDate)) + theSidePad;
        })
        .attr('y', function(d, i){
            return i * theGap + theTopPad;
        })
        .attr('width', function(d){
            return (timeScale(dateFormat.parse(d.dueDate)) - timeScale(dateFormat.parse(d.startDate)));
        })
        .attr('height', theBarHeight)
        .attr('stroke', 'none')
        .attr('fill', function(d, i){
            return d3.rgb(theColorScale(i));
        })
        .on('click', function(d, i) {
            return window.location.hash = '/' + d._id;
        });
   

    var barText = barGroup.append('text')
        .text(function(d, i){
            // Check the bar width and truncate text if necessary
            var barWidth = d3.selectAll('rect')[0][i].width.baseVal.value;
            var textLength = d.name.length;
            
            if( (barWidth/textLength) < 11.5 ){
                return d.name.substr(0, d.name.length - 7) + '...';
            } else {
                return d.name;
            }
        })
        .attr('x', function(d){
            return timeScale(dateFormat.parse(d.startDate)) + 15;
        })
        .attr('y', function(d, i){
            return i * theGap + 25 + theTopPad;
        })
        .attr('font-size', 12)
        .attr('font-weight', 100)
        .attr('text-height', theBarHeight)
        .attr('fill', '#fff');

    // Event Handlers on bars
    bars.on('mouseover', function() {
        var self = d3.select(this);
        var currentFill = self.attr('fill');
        
        self.attr('fill', function(){
            return d3.rgb(currentFill).darker(1);
        });
    }).on('mouseout', function() {
        var self = d3.select(this);
        var currentFill = self.attr('fill');
        
        self.attr('fill', function(){
            return d3.rgb(currentFill).brighter(1);
        });
    });

    // Event Handlers on text
    barText.on('mouseover', function(d, i) {
        var selfBar = d3.select(this.parentNode.childNodes[i]);
        var currentFill = selfBar.attr('fill');
        
        selfBar.attr('fill', function(){
            return d3.rgb(currentFill).darker(1);
        });
        
    }).on('mouseout', function(d, i) {
        var selfBar = d3.select(this.parentNode.childNodes[i]);
        var currentFill = selfBar.attr('fill');
        
        selfBar.attr('fill', function(){
            return d3.rgb(currentFill).brighter(1);
        });
    });
  
  // Return side effects lol
}