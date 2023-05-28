/*
*    main.js
*/
var mwidth = 600;
var mheight = 400;
var margin = {top: 10, right: 10, bottom: 100, left:100};

var svg = d3.select("#chart-area").append("svg")
	.attr("width", mwidth + margin.right + margin.left)
	.attr("height", mheight + margin.top + margin.bottom);

var g = svg.append("g")
		.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")

d3.json("data/revenues.json").then((data)=> {
	console.log(data);

	revenue= d3.max(data,(d) => {return d.revenue});
	months= data.map((d)=> {return d.month});


	var x = d3.scaleBand()
	.domain(months)
	.range([0, mwidth])
	.paddingInner(0.1)
	.paddingOuter(0.1);

	var y = d3.scaleLinear()
	.domain([0, revenue])
	.range([mheight,0]); 

	var colors = d3.scaleOrdinal()
	.domain(months)
	.range(d3.schemeSet3);

var rectangles = g.selectAll("rect")
	.data(data);

rectangles.enter()
	.append("rect")
		.attr("x", (d)=>{return x(d.month);})
		.attr("y", (d) => {return y(d.revenue);})
		.attr("height", (d) => { return mheight - y(d.revenue); })
		.attr("width", x.bandwidth).attr("fill", "yellow");

		var xAxisCall = d3.axisBottom(x);

		var leftAxis = d3.axisLeft(y)
		.ticks(11).tickFormat((d) => { return "$" + d; });

		g.append("g")
			.attr("class", "bottom axis")
			.attr("transform", "translate(0, " + mheight  + ")")
			.call(xAxisCall)
		.selectAll("text")
			.attr("y", "7")
			.attr("x", "-3")
			.attr("text-anchor", "middle")
            .style("fill", "white");
		g.append("g")
			.attr("class", "left axis")
			.call(leftAxis);



		// Y Label
		g.append("text")
		.attr("class", "y axis-label")
		.attr("x", - (mheight/2))
		.attr("y", -60)
		.attr("font-size", "25px")
		.attr("text-anchor", "middle")
		.attr("transform", "rotate(-90)")
		.style("fill","white")
		.text("Revenues (dlls.)");
		

		g.append("text")
		.attr("class", "x axis-label")
		.attr("x", mwidth/2)
		.attr("y", mheight + 140)
		.attr("font-size", "25px")
		.attr("text-anchor", "middle")
		.attr("transform", "rotate(0)")
		.style("fill","white")
		.text("Month");

        

		


}).catch((error)=>{
	console.log(error);
});