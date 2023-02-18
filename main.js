
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
