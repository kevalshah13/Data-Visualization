var bmw=[],merc=[],year=new Set(),keys=["price","mileage","tax","mpg","engineSize"],radialScale,labelx;
var data1={},data2={},data,label;


document.addEventListener('DOMContentLoaded', function () {
	 Promise.all([d3.csv("data/data.csv")]).then(function (values) {
		 for(i=0;i<values[0].length;i++){
             if(values[0][i]["Manufacturer"]=='BMW'){
         			 bmw.push(TypeCasting(values[0][i]))
     }
       else{
         merc.push(TypeCasting(values[0][i]))
       }
       }
        preprocessing();
        DrawChart1(0);
        DrawChart1(1);
});

				});
function DrawChart1(flag){

  if(flag==0){
    data=data1
    figure='#merc'
    label="Mercedes"
    labelx=255
  }
  else{
    data=data2
    figure='#bmw'
    label="BMW"
    labelx=270
  }
	console.log("before")
  let svg = d3.select(figure).append("svg")
      .attr("width", 600)
      .attr("height", 700);

  radialScale = d3.scaleLinear()
        .domain([0,100])
        .range([0,200]);
  let ticks = [20,40,60,80,100];

    ticks.forEach(t =>
      svg.append("circle")
      .attr("cx", 300)
      .attr("cy", 350)
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("r", radialScale(t))
  );
  ticks.forEach(t =>
    svg.append("text")
    .attr("x", 305)
    .attr("y", 350 - radialScale(t))
    .text(t.toString())
);

svg.append("text")
.attr("x", 305)
.attr("y", 350)
.text(0);
for (var i = 0; i < keys.length; i++) {
    let ft_name = keys[i];
    let angle = (Math.PI / 2) + (2 * Math.PI * i / keys.length);
    let line_coordinate = angleToCoordinate(angle, 100);
    let label_coordinate = angleToCoordinate(angle, 107);

    //draw axis line
    svg.append("line")
    .attr("x1", 300)
    .attr("y1", 350)
    .attr("x2", line_coordinate.x)
    .attr("y2", line_coordinate.y)
    .attr("stroke","black");

    //draw axis label
    svg.append("text")
    .attr("x", label_coordinate.x)
    .attr("y", label_coordinate.y)
    .text(ft_name)

}
let line = d3.line()
    .x(d => d.x)
    .y(d => d.y);
let colors = ["darkorange", "gray", "navy"];
let color="red"
let coordinates = getPathCoordinates(data);
coordinates.push(coordinates[0])

svg.append("path")
.datum(coordinates)
.attr("d",line)
.attr("stroke-width", 3)
.attr("stroke", "#000000")
.attr("fill", color)
//.attr("stroke-opacity", 1)
.attr("opacity", 0.7)
.on('mouseover', function(d, i, n ) {
                            console.log("in")
                             d3.select(this).transition()
                                 .duration('50')
                                 .attr("stroke-width", 3)
                                 .attr("opacity",1)})
                                 .on('mouseout', function (d, i,n) {
                                                 d3.select(this).transition()
                                                  .duration('50')
                                                    .attr('opacity', 0.7)
                                                                                              })


svg.append("text")
.attr("x",labelx)
.attr("y", 650)
.style("font-weight","bold")
.style("font-size",20)
.text(label)

for(let i=0;i<keys.length;i++){
    svg.append("circle")
    .attr("cx", coordinates[i]["x"])
    .attr("cy", coordinates[i]["y"])
    .attr("fill", "black")
    .attr("stroke", "gray")
    .attr("r", 5)
}
}

function angleToCoordinate(angle, value){
    let x = Math.cos(angle) * radialScale(value);
    let y = Math.sin(angle) * radialScale(value);
    return {"x": 300 + x, "y": 350 - y};
}
function getPathCoordinates(data){
    let coordinates = [];
    for (var i = 0; i < keys.length; i++){
        let ft_name = keys[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / keys.length);
        coordinates.push(angleToCoordinate(angle, data[ft_name]));
    }
    return coordinates;
}


function TypeCasting(arr){

  var temp = {}
  for (const [key, value] of Object.entries(arr)) {
    if(key=='price' || key=='mileage' || key=='mpg' || key=='tax'
    || key=='engineSize'|| key=='year'){
      temp[key] = parseFloat(value)
    }
    // else if(key=='Year'){
    //   // temp[key] = new Date(value,0,1).getFullYear();
    //   temp[key] = parseInt(value)
    // }
    else{
      temp[key]=value;
    }
}
		//console.log(temp)
		return temp

}

function preprocessing(){
		for(let i=0;i<keys.length;i++){
			data1[keys[i]]=(d3.mean(merc, d => d[keys[i]])-d3.min(merc,d=> d[keys[i]]))*100/(d3.max(merc,d=> d[keys[i]])-d3.min(merc,d=> d[keys[i]]))
      data2[keys[i]]=(d3.mean(bmw, d => d[keys[i]])-d3.min(bmw,d=> d[keys[i]]))*100/(d3.max(bmw,d=> d[keys[i]])-d3.min(bmw,d=> d[keys[i]]))
		}
    //console.log(data1,".....")
		//console.log(data2,"////");

}
