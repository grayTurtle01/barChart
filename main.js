url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'

fetch(url)
	.then( res => res.json() )
	.then( data => {
			dataset = data.data
			renderChart()
	 })


function getYear(yymmdd){
	return yymmdd.split('-')[0]
}

function renderChart(){
	w = 700
	h = 500
	padding = 50

	svg = d3.select('body')
					.append('svg')
					.attr('width', w)
					.attr('height', h)  


	firstDate = dataset[0][0]
	lastDate = dataset[dataset.length - 1][0]
	
	
	// Scale
	xScale = d3.scaleLinear()
						 .domain([getYear(firstDate), getYear(lastDate)])
						 .range([padding, w-padding])

	yScale = d3.scaleLinear()
						 .domain([0, 18000])
						 .range([h-padding, padding])


	// Axis
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


	// Plot
	svg.selectAll('rect')
		 .data(dataset)
		 .enter()

				.append('rect')
				.attr('x', (d,i) => xScale( getYear(d[0]) ))
				.attr('y',  d => yScale(d[1]))
				.attr('width', 8)
				.attr('height', d => h-yScale(d[1]) - padding)
				.attr('class', 'bar')
}
