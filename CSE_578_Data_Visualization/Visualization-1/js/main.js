// Hint: This is a good place to declare your global variables

var female_data,male_data,temp;
var margin = {top: 50, right: 50, bottom: 50, left: 50},
width = 1000 - margin.left - margin.right,
height = 600 - margin.top - margin.bottom,svg,
padding=30;

// This function is called once the HTML page is fully loaded by the browser
document.addEventListener('DOMContentLoaded', function () {
   // Hint: create or set your svg element inside this function
   svg = d3.select("#my_dataviz")
   .append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .append("g")
   .attr("transform","translate(" + margin.left + "," + margin.top + ")");
   //This will load your two CSV files and store them into two arrays.
   Promise.all([d3.csv('data/females_data.csv'),d3.csv('data/males_data.csv')])
        .then(function (values) {
            //console.log('loaded females_data.csv and males_data.csv');
            female_data = values[0];
            male_data = values[1];
            // Hint: This is a good spot for doing data wrangling
            male_data=TypeCasting(male_data);
            female_data=TypeCasting(female_data);
            drawLolliPopChart();
        });
});
// Use this function to draw the lollipop chart.
function drawLolliPopChart() {

    var value = document.getElementById("Countries").value;
    var result=[];
    d3.select("svg").remove();
    for(let i=0;i<male_data.length;i++){
    result.push(male_data[i][value])
    }
    //console.log(result);


// // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")")
    .attr("border",0);

      var x = d3.scaleBand()
      .domain(male_data.map(function(d) { return d['Year'];}))
      .range([0, width])
      .padding(1);

      svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(5))
      .selectAll("text")
      .attr("transform", "translate(-10,0)")
      .attr("dx", "-.8em")
      .attr("dy", ".30em")
      .attr("font-weight" ,"200")
      .attr("transform", "rotate(-45)");
      //.style("text-anchor", "end");
//
// // Add Y axis
      var y = d3.scaleLinear()
      .domain([0,d3.max(result)])
      .range([height,0]);
      svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")

// // Lines
      svg.selectAll("myline")
      .data(male_data)
      .enter()
      .append("line")
      .attr('class','male_data')
      .attr("x1", function(d) { return x(d['Year'])-5; })
      .attr("x2", function(d) { return x(d['Year'])-5; })
      .attr("y1", function(d) { return y(d[value]); })
      .attr("y2", y(0))
      .attr("stroke", "#008080")
      .attr("data-legend",function(d) { return d['Year']})

// // Circles
      svg.selectAll("mycircle")
      .data(male_data)
      .enter()
      .append("circle")
      .attr('class','male_data')
      .attr("cx", function(d) { return x(d['Year'])-5; })
      .attr("cy", function(d) { return y(d[value]); })
      .attr("r", "4")
      .style("fill", "#008080")
      .attr("stroke", "#008080")

      svg.selectAll("myline")
      .data(female_data)
      .enter()
      .append("line")
      .attr('class','female_data')
      .attr("x1", function(d) { return x(d['Year'])+5; })
      .attr("x2", function(d) { return x(d['Year'])+5; })
      .attr("y1", function(d) { return y(d[value]); })
      .attr("y2", y(0))
      .attr("stroke", "#FF1493")

// // Circles
      svg.selectAll("mycircle")
      .data(female_data)
      .enter()
      .append("circle")
      .attr('class','female_data')
      .attr("cx", function(d) { return x(d['Year'])+5; })
      .attr("cy", function(d) { return y(d[value]); })
      .attr("r", "4")
      .style("fill", "#FF1493")
      .attr("stroke", "#FF1493")

      svg.append('text')
                .attr('class','axis-label')
                .attr('transform','rotate(-90)')
                .attr('y','-35px')
                .attr('x','-250px')
                .attr('text-anchor','middle')
                .text('Employment Rate')
                .style('font-weight','600')
            svg.append('text')
                .attr('class','axis-label')
                .attr('text-anchor','middle')
                .attr('x',width/2)
                .attr('y',height+35)
                .text('Year')
                .style('font-weight','600')

        svg.append("rect").attr("x",680).attr("y",-20).attr("width", 20).attr("height","20").style("fill", "#FF1493")
        svg.append("rect").attr("x",680).attr("y",10).attr("width", 20).attr("height","20").style("fill", "#008080")
        svg.append("text").attr("x", 710).attr("y", -10).text("Female Employment Rate").style("font-size", "15px").
        style("font-weight", '500').attr("alignment-baseline","middle")
        svg.append("text").attr("x", 710).attr("y", 20).text("Male Employment Rate").style("font-size", "15px").
        style("font-weight", '500').attr("alignment-baseline","middle")

    console.log('trace:drawLollipopChart()');

    svg
    .exit()
    .remove()
}


function TypeCasting(arr){
  var arr1=[];
  for (var i = 0; i < arr.length; i++){
    var temp = {}
  for (const [key, value] of Object.entries(arr[i])) {
      temp[key] = parseFloat(value)
}
  arr1.push(temp)
}
return arr1
}
