/*
*    main.js
*/
var mwidth = 600;
var mheight = 400;
var margin = {top: 10, right: 10, bottom: 100, left:100};

var g = d3.select("#chart-area").append("svg")
	.attr("width", mwidth + margin.right + margin.left)
	.attr("height", mheight + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


var x = d3.scaleLog().range([0, mwidth]).domain([142, 150000]).padding(0.2);
var y = d3.scaleLinear().range([mheight, 0]);

var area = d3.scaleLinear().range([25*Math.PI, 1500*Math.PI]).domain([2000, 1400000000]);

var color =d3.scaleOrdinal().domain(d3.schemePastel1);

var xAxis = d3.axisbottom(x)
		.tickvalues([400,4000,40000]).tickFormat((d) => { return "$ " + d; });;

var yAxis = d3.axisLeft(y);

g.append("text")
		.attr("class", "y axis-label")
		.attr("x", - (mheight/2))
		.attr("y", -60)
		.attr("font-size", "25px")
		.attr("text-anchor", "middle")
		.attr("transform", "rotate(-90)")
		.style("fill","black")
		.text("Life Expectancy (Years)");

g.append("text")
		.attr("class", "x axis-label")
		.attr("x", mwidth/2)
		.attr("y", height + 140  )
		.attr("font-size", "25px")
		.attr("text-anchor", "middle")
		.attr("transform", "rotate(-20)")
		.style("fill","black")
		.text("GDP Per Capita ($)");


var t = d3.transition().duration(1000);




d3.json("data/data.json").then(function(data){
	data.forEach((d)=>{
		d.year = +d.year;
		if(d.year===2014){
			d.year=1800;
		}

	});

	d3.interval( ( ) => {
		update(data);
		
		flag = !flag;
		//console.log("errdf");
	}, 1000);
	update(data);
}).catch((error)=> {
	console.log(error);
});

const formattedData = data.map((year) => {
	return year["countries"].filter((country) => {
		var dataExists = (country.income && country.life_exp);
		return dataExists
	}).map((country) => {
		country.income = +country.income;
		country.life_exp = +country.life_exp;
		return country;
	})
});

circles.append("circle")

	.attr("fill", (d) => { return d.continent })

	.attr("cy", (d) => { return y(d.life_exp) })

	.attr("cx", (d) => { return x(d.income) })

	.attr("r", (d) => { return  Math.sqrt(area(d.population) / Math.PI)});


function update(data) {

}