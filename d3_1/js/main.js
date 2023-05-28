/*
*    main.js
*/
var svg = d3.select("#chart-area").append("svg")
	.attr("width", 800)
	.attr("height", 800);

var circle = svg.append("circle")
	.attr("cx", 150)
	.attr("cy", 250)
	.attr("r", 80)
	.attr("fill", "blue");

	
    var rect = svg.append("rect")
	.attr("x", 40)
	.attr("y", 40)
	.attr("width", 30)
	.attr("height", 30)
	.attr("fill","green");