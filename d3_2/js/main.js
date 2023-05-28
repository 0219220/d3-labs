/*
*    main.js
*/
var svg = d3.select("#chart-area").append("svg")
	.attr("width", 400)
	.attr("height", 400);

var data= [25,20,15,10,5];

var rectangles = svg.selectAll("rect")
	.data(data);

rectangles.enter()
	.append("rect")
	.attr("x", (d,i)=>{
		console.log("Item: " + d + "Index: " + i);
		return 40*i;

	})

	.attr("y", 40)
	.attr("width", 40)
	.attr("height", (d,i)=>{
		
		console.log("Item: " + d + "Index: " + i);
		return i;
	})
	.attr("fill","green");
