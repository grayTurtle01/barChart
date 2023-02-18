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

sample2 =  [
    [
      "1947-01-01",
      243.1
    ],
    [
      "1947-04-01",
      500.3
    ],
    [
      "1947-07-01",
      1000.1
    ],
    [
      "1947-10-01",
      2000.3
    ],
    [
      "1948-01-01",
      2500.2
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

function getYearAndQuarter(date){
  let year = getYear(date)
  let quarter = getQuarter(date)

  return year + '-' + quarter
}

function getYearAndFraction(date){
  let year = getYear(date)
  let quarter = getQuarter(date)

  fraction = 0
  if( quarter == 'Q1')
    fraction = 0

  if( quarter == 'Q2')
    fraction = 25

  if( quarter == 'Q3')
    fraction = 50

  if( quarter == 'Q4')
    fraction = 75


  return Number(year  + '.' + fraction) 
}


function getFormatedYears( points ){
	
  years = points.map( point => {
	let date = point[0]
	
	return getYearAndQuarter(date)
  })
  return years
}

//~ getQuarter('1999-10-31')
//~ console.log(getYearAndQuarter('1999-01-15'))
//~ console.log(getFormatedYears(sample))
//~ console.log( getYearAndFraction('1998-04-16'))

// Main 
function main(){
  url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'

  fetch(url)
    .then( res => res.json() )
    .then( data => {
	let dataset = data.data
	renderChart(dataset)
	setEvents()
      })
}

function renderChart(dataset){
	w = 900
	h = 560
	padding = 50
	
	numberOfBars = (dataset.length)
	barWidth = (w - padding*2)  / (numberOfBars)

	// SVG
	svg = d3.select('body')
		.append('svg')
		.attr('width', w)
		.attr('height', h)
		

	// Labels
	svg.append('text')
	   .text('Gross Domestic Product')
	   .attr('transform', 'rotate(-90)')
	   .attr('x', -250)
	   .attr('y', 80)
	


	firstDate = dataset[0][0]
	lastDate = dataset[dataset.length - 1][0]

	lastYear = getYear(lastDate)
	firstYear = getYear(firstDate)
	
	// Scale
	xScale = d3.scaleLinear()
		   .domain([firstYear, lastYear])
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
		.attr('x', (d,i) => xScale( getYearAndFraction(d[0]) ))
		.attr('y',  d => yScale(d[1]))
		.attr('width', barWidth)
		.attr('height', d => h-yScale(d[1]) - padding)
		//~ .attr('height', 100)
		.attr('class', 'bar')

		.attr('data-date', d => getYearAndQuarter(d[0]) )
		.attr('data-gdp', d => d[1])
}

function setEvents(){
  bars = document.querySelectorAll(".bar")

  bars.forEach( bar => {
    

    bar.addEventListener('mouseenter', function(e){
      tooltip.style.top = e.clientY;
      tooltip.style.left = e.clientX;
      tooltip.style.background = 'steelblue';
      tooltip.style.opacity = 1;
      tooltip.setAttribute('data-date', bar.getAttribute('data-date') )
  

      date.innerText = this.dataset.date
      gdp.innerText = this.dataset.gdp

      bar.setAttribute('fill', '#f00')
     	

    })

    bar.addEventListener('mouseleave', function(){
      tooltip.style.opacity = 0;
      bar.setAttribute('fill', '#000')
  })

    
  })


  
}

main()

function main2(){

  renderChart(sample2)
  setEvents()
}

//~ main2()
