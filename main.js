/*** Auxiliars ***/
sample =  [
    [
      "1947-01-01",
      243.1
    ],
    [
      "1947-04-01",
      246.3
    ],
    [
      "1947-07-01",
      250.1
    ],
    [
      "1947-10-01",
      260.3
    ],
    [
      "1948-01-01",
      266.2
    ],
    [
      "1948-04-01",
      272.9
    ],
    [
      "1948-07-01",
      279.5
    ],
    [
      "1948-10-01",
      280.7
    ]
   ]

function getYear(yymmdd){
	return yymmdd.split('-')[0]
}

function getQuarter(date){
	let month = date.split('-')[1]

	let quarter = ''
	if( month == '01')
		quarter = 'Q1'
	else if( month == '04')
		quarter ='Q2'
	else if( month == '07')
		quarter = 'Q3'
	else if( month == '10')
		quarter  = 'Q4'
	
	return quarter
}

function getFormatedYears( points ){
	
	years = points.map( point => {
			let date = point[0]
			
			let year = date.split('-')[0]
			let quarter = getQuarter(date)

			return year + '-' + quarter
	})
	return years
}

//~ getQuarter('1999-10-31')
//~ getFormatedYears(sample)

// Main 
function main(){
	url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'

	fetch(url)
		.then( res => res.json() )
		.then( data => {
				dataset = data.data
				renderChart()
		 })
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


	// Bars
	svg.selectAll('rect')
		 .data(dataset)
		 .enter()

				.append('rect')
				.attr('x', (d,i) => xScale( getYear(d[0]) ))
				.attr('y',  d => yScale(d[1]))
				.attr('width', 8)
				.attr('height', d => h-yScale(d[1]) - padding)
				.attr('class', 'bar')

				.attr('data-date', d => d[0])
				.attr('data-gdp', d => d[1])
}
