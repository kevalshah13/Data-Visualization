var margin = {top: 50, right: 50, bottom: 50, left: 50},
width = 1500 - margin.left - margin.right,
height = 1200 - margin.top - margin.bottom,svg;
//padding=30;
var data=[],groups,res;
var countries=[];
var list=[],data1=[]
var attribute;
var val,y,result=[],x,y,year1=[];
var expanded = false,start,end,set;
var regions=['East Asia & Pacific','Europe & Central Asia','Latin America & Caribbean','Middle East & North Africa','North America',
'South Asia','Sub-Saharan Africa'];
document.addEventListener('DOMContentLoaded', function () {
   //This will load your two CSV files and store them into two arrays.

   Promise.all([d3.csv("data/dv4.csv")]).then(function (values) {
     for(i=0;i<values[0].length;i++){

       data.push(TypeCasting(values[0][i]))
     }
                        DrawChart();
        });

        console.log("svg created")
});
function getRegion(){
  data1=[]
  start = document.getElementById("start").value;
  start=parseInt(start)
  end = document.getElementById("end").value;
  end=parseInt(end)
  //console.log(typeof(start));

  for(var i=0;i<data.length;i++){
    if(list.includes(data[i]['World bank region'])){
      if(data[i]['Year']>=start && data[i]['Year']<=end){
        data1.push(TypeCasting(data[i]));
        //year1.push(data[i]['Year']);
    }}}}


function checkAll(){
  list=[]
  var l1 = document.getElementById("sa");
  var l2 = document.getElementById("eca");
  var l3 = document.getElementById("mena");
  var l4 = document.getElementById("ssa");
  var l5 = document.getElementById("lac");
  var l6 = document.getElementById("eap");
  var l7 = document.getElementById("na");

  if(l1.checked== true){
    list.push(document.getElementById("sa").value);
  }
  if(l2.checked== true){
    list.push(document.getElementById("eca").value);
  }
  if(l3.checked== true){
    list.push(document.getElementById("mena").value);
  }
  if(l4.checked== true){
    list.push(document.getElementById("ssa").value);
  }
  if(l5.checked== true){
    list.push(document.getElementById("lac").value);
  }
  if(l6.checked== true){
    list.push(document.getElementById("eap").value);
  }
  if(l7.checked== true){
    list.push(document.getElementById("na").value);
  }
  getRegion();
}
function dynamic(){
  DrawChart();
  opaque();
}

function DrawChart(){
  checkAll();
  year1=[]
  for(let i=start;i<=end;i++){
    year1.push(i);
  }

  groups = d3.group(data1,d=> d.Country)
  d3.select("svg").remove();
  attribute=document.getElementById("Attributes").value;
  result=[]
  for(let i=0;i<data1.length;i++){
  result.push(data1[i][attribute]);
  }
  var range=(d3.max(result)-d3.min(result))/10
  svg = d3.select("#my_dataviz")
 .append("svg")
 .attr("width", width + margin.left + margin.right)
 .attr("height", height + margin.top + margin.bottom)
 .append("g")
 .attr("transform","translate(" + margin.left + "," + margin.left+ ")");

  x = d3.scaleLinear()
  .range([0, width-margin.right])
  .nice()

  y = d3.scaleLinear()
  .range([height,0]);

      Graph();
      svg.selectAll(".line")
     .data(groups)
     .join("path")

     .attr('id','Lines')
       .attr("fill", "none")
       .attr("stroke", function(d){return d[1][0]["Color"]; })
       .attr("stroke-width", 4)
       //.transition().delay(1500)
       .attr('marker-end', 'url(#dot)')
       .attr("d", function(d){
         return d3.line()
           .x(function(d) { return x(d['Year']); })
           .y(function(d) { return y(d[attribute]); })
           .curve(d3.curveNatural)(d[1])
       })//.transition().delay(1500)
       .on("mouseover", function(d,i) {
           d3.select(this)
             .style("stroke-width", 8)})
   .on("mouseout", function(d,i) {
           d3.select(this)
             .style("stroke-width", 4)
         });

         svg.selectAll("myPoints")
             .data(groups)
             .enter()
             .append('g')
               .append("circle")
               .attr("id","cir")
               .attr("cx", function(d) {  return x(d[1][d[1].length-1].Year)} )
               .attr("cy", function(d) {  return y(d[1][d[1].length-1][attribute])} )
               .attr("r", 6)
               .attr("stroke", "black")
               .style("fill", function(d){ return d[1][0].Color; });


       svg.selectAll("myLabels")
             .data(groups)
             .enter()

             .append('g')
             .append("text")
               .datum(function(d) { return {Country:d[1][0]["Country"], Year: d[1][d[1].length-1]["Year"], Color:d[1][d[1].length-1]["Color"], Value: d[1][d[1].length-1][attribute]}; }) // keep only the last value of each time series
                 .attr("transform", function(d) { return "translate(" + x(d['Year']) + "," + y(d.Value) + ")"; }) // Put the text at the position of the last point
                 .transition().ease(d3.easeLinear).delay(1500)//.duration(1600)
           .attr("x", 12) // shift the text a bit more right
           .attr("id","lab")
           .text(function(d) { return d.Country; })
           .style("fill", function(d){ return d.Color; })
           .style("font-size", 15)
}
function Graph(){
  svg.append("g")
  .attr("id", "xaxis")
  .attr("transform", "translate(0," + height + ")")
  .selectAll("text")
  .attr("transform", "translate(0,0)")
  .attr("dx", "0em")
  .attr("dy", "1em")
  .attr("font-weight" ,"200")
  .attr("font-size","20")
  .call(d3.axisBottom(x))

  svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width/2)
    .attr("y", height + margin.top )
    .attr("font-size","20")
    .text("Years");

  svg.append("g")
  .attr("id", "yaxis")
  .attr("transform", "translate(0, 0)")
  .call(d3.axisLeft(y))
  // .selectAll("text")
  // .attr("font-size","20")
  .append('text')
    .attr("x",-500)
    .attr("y",-35)
    .attr("transform", "rotate(-90)")
    .attr("fill", "#000")
    .text(attribute);
  // svg.append("g")
  // .attr("id", "yaxis")
  // .call(d3.axisLeft(y))



    y.domain([d3.min(result),d3.max(result)])
    x.domain([start,end])

    svg.select("#yaxis").transition().duration(1500).call(d3.axisLeft(y)).selectAll("text")
    .attr("font-size","20")
    svg.select("#xaxis").transition().duration(1500).call(d3.axisBottom(x)).selectAll("text")
    .attr("font-size","20")



}
function Animation(){
  d3.select("svg").remove();

  getRegion();
  var range=(d3.max(result)-d3.min(result))/10
  svg = d3.select("#my_dataviz")
 .append("svg")
 .attr("width", width + margin.left + margin.right)
 .attr("height", height + margin.top + margin.bottom)
 .append("g")
 .attr("transform","translate(" + margin.left + "," + margin.left+ ")");

  x = d3.scaleLinear()
  .domain([start,end])
  .range([0, width-margin.right])
  .nice();

  svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(0,0)")
  .attr("dx", "0em")
  .attr("dy", "1em")
  .attr("font-weight" ,"200")
  .attr("font-size","20")
  ;

  svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width/2)
    .attr("y", height + margin.top )
    .attr("font-size","20")
    .text("Years");


  y = d3.scaleLinear()
  .domain([d3.min(result)-range,d3.max(result)])
  .range([height,0]);

  svg.append("g")
  .attr("id", "yaxis")
  .call(d3.axisLeft(y))
  .append('text')
  .attr("font-size","20")
  .attr("x",-300)
  .attr("y",-25)
  .attr("transform", "rotate(-90)")
  .attr("fill", "#000")
  .attr("font-size","20")
  .text(attribute);

  // svg.append("g")
  //     .attr("class", "y axis")
  //     .call(yAxis)



   svg.selectAll(".line")
  .data(groups)
  .join("path")

  .attr('id','Lines')
    .attr("fill", "none")
    .attr("stroke", function(d){return d[1][0]["Color"]; })
    .attr("stroke-width", 4)

    .attr("d", function(d){
      return d3.line()
        .x(function(d) { return x(d['Year']); })
        .y(function(d) { return y(d[attribute]); })
        .curve(d3.curveNatural)(d[1])
        //.attr('marker-end', 'url(#dot)')
    }).call(lineTransition).on("mouseover", function(d,i) {
	      d3.select(this)
	        .style("stroke-width", 8)})
.on("mouseout", function(d,i) {
	      d3.select(this)
	        .style("stroke-width", 2.4)
	    })


    svg.selectAll("myPoints")
        .data(groups)
        .enter()
        .append('g')
          .append("circle")
          .attr("id","cir")
          .attr("opacity", 0)
          .attr("cx", function(d) {  return x(d[1][d[1].length-1].Year)} )
          .attr("cy", function(d) {  return y(d[1][d[1].length-1][attribute])} )
          .attr("r", 6)
          .attr("stroke", "black")
          .style("fill", function(d){ return d[1][0].Color; })
          .transition()
						  .duration(500)
						  .delay(1600)
					      .attr("opacity", 1);

    svg.selectAll("myLabels")
          .data(groups)
          .enter()
          .append('g')
          .append("text")
            .datum(function(d) { return {Country:d[1][0]["Country"], Year: d[1][d[1].length-1]["Year"], Color:d[1][d[1].length-1]["Color"], Value: d[1][d[1].length-1][attribute]}; }) // keep only the last value of each time series
              .attr("transform", function(d) { return "translate(" + x(d['Year']) + "," + y(d.Value) + ")"; }) // Put the text at the position of the last point
        .attr("x", 12)
        .attr("opacity", 0) // shift the text a bit more right
        .attr("id","lab")
        .text(function(d) { return d.Country; })
        .style("fill", function(d){ return d.Color; })
        .style("font-size", 15)
        .transition()
            .duration(500)
            .delay(1600)
              .attr("opacity", 1)

              // Graph();
}



 function tweenDash() {
    let l = this.getTotalLength(),
      i = d3.interpolateString("0," + l, l + "," + l);
    return function(t) { return i(t) };
    }

  function lineTransition(path) {
      path.transition()
      .duration(2500)
      .attrTween("stroke-dasharray", tweenDash)
      .on("end", () => {
      });
}

 function opaque(){
   d3.select("#opacityMeasure").on("input", function () {
     var a=d3.select("#opacityMeasure").property("value")/100;
     svg.selectAll('#Lines')
                    .transition()
                    .duration(1000)
                    .ease(d3.easeLinear)
                    .style("opacity", a);
    })
  }

function TypeCasting(arr){

  var temp = {}
  for (const [key, value] of Object.entries(arr)) {
    if(key=='Birth Rate' || key=='Death Rate' || key=='Fertility Rate' || key=='Life Expectancy at Birth, Female'
    || key=='Life Expectancy at Birth, Male' || key=='Life Expectancy at Birth, Total'
    || key=='Mobile Cellular Subscriptions per 100 People'
    || key=='Telephone Lines per 100 People' || key=='Arable Land Percent' || key=='Urban Population Percent'){
      temp[key] = parseFloat(value)
    }
    else if(key=='Year'){
      // temp[key] = new Date(value,0,1).getFullYear();
      temp[key] = parseInt(value)
    }
    else{
      temp[key]=value;
    }
  }
    return temp
}

function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

function selectAll(){
	let cboxes = document.getElementsByName("cbox");
	for(let i=0; i<cboxes.length;i++)
	{
		if(cboxes[i].checked==true)
		{
			continue;
		}
		else
		{
			cboxes[i].checked=true;
		}
	}
}

function deselectAll(){
	let cboxes = document.getElementsByName("cbox");
	for(let i=0; i<cboxes.length;i++)
	{
		if(cboxes[i].checked==false)
		{
			continue;
		}
		else
		{
			cboxes[i].checked=false;
		}
	}
}

function checked(value){
  var checkBox = document.getElementById("myCheck");
  var text = document.getElementById("text");
  if (checkBox.checked == true){
    text.style.display = "block";
  } else {
     text.style.display = "none";
  }
}
