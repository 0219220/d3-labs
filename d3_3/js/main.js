/*
*    main.js
*/
d3.csv("ages.csv").then((data)=> {

	console.log(data);

});

d3.tsv("ages.tsv").then((data)=> {

	console.log(data);

});

d3.json("ages.json").then((data)=> {

	data.forEach((d)=>{

		d.age = +d.age;

	});

	console.log(data);



var svg = d3.select("#chart-area").append("svg")
	.attr("width", 400)
	.attr("height", 400);


var circles = svg.selectAll("circle")

	.data(data);

circles.enter()
	.append("circle")
	.attr("cx", (d,i)=>{
		console.log("Item: " + d + "Index: " + i);
		return (i*50) +25;
	})
	.attr("cy", 20)
	.attr("r", (d)=>{
		return d.age;
	})
	.attr("fill","green");	
	
}).catch((error)=>{
	console.log(error);
});