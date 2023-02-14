w = 600
h = 400
padding = 20

svg = d3.select('body')
			  .append('svg')
			  .attr('width', w)
			  .attr('height', h)  


xScale = d3.scaleLinear()
           .domain([1900, 2015])
           .range([padding, w-padding])


xAxis = d3.axisBottom(xScale)

svg.append('g')
   .attr('transform', `translate(0, ${h-padding})`)
   .attr('id', 'x-axis')
   .call(xAxis)
