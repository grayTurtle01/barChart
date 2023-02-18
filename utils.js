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
