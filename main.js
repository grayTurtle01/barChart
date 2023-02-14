w = 700
h = 500
padding = 50

svg = d3.select('body')
			  .append('svg')
			  .attr('width', w)
			  .attr('height', h)  


xScale = d3.scaleLinear()
           .domain([1900, 2015])
           .range([padding, w-padding])

yScale = d3.scaleLinear()
					 .domain([0, 18000])
					 .range([h-padding, padding])


xAxis = d3.axisBottom(xScale)

yAxis = d3.axisLeft(yScale)

svg.append('g')
   .attr('transform', `translate(0, ${h-padding})`)
   .attr('id', 'x-axis')
   .call(xAxis)

svg.append('g')
	 .attr('transform', `translate(${padding}, 0)`)
	 .attr('id', 'y-axis')
	 .call(yAxis)	
