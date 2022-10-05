var vowel,consonant,punct,colors;
var width = 640, // outer width, in pixels
height = 400, // outer height, in pixels
radius =Math.min(width, height) / 2 -10;
var donutWidth = 75;
var margin=50,countC,countP,countP;

var svg1 = d3.selectAll('#bar_svg')
  .append('svg')
  .attr("id","bar1_svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
function submitText(){
  d3.select("#bar1_svg").remove();
  vowel=[],consonant=[],punct=[];
  var value = document.getElementById("wordbox").value;
  value=value.toLowerCase();
  for(let i=0;i<value.length;i++){
    if(value[i]=='a' || value[i]=='e' || value[i]=='i' || value[i]=='o' || value[i]=='u' || value[i]=='y' ){
      vowel.push(value[i]);
    }
    else if (value[i]=='.' || value[i]==',' || value[i]=='?' || value[i]=='!' ||value[i]==';' || value[i]==':') {
      punct.push(value[i]);
    }
    else if(value[i]=='b' || value[i]=='c' || value[i]=='d' || value[i]=='f' || value[i]=='g' || value[i]=='h' ||value[i]=='j' || value[i]=='k'
    || value[i]=='l' || value[i]=='m' ||value[i]=='n' || value[i]=='p' ||value[i]=='q' || value[i]=='r' || value[i]=='s' || value[i]=='t' ||value[i]=='u'
     || value[i]=='v' || value[i]=='w' || value[i]=='x' ||  value[i]=='z'){
      consonant.push(value[i]);
    }

  }

  countV=DataG(vowel,0);
  var v=vowel.length,c=consonant.length,p=punct.length;
  countC=DataG(consonant,1);
  countP=DataG(punct,2);
  var dist=[v,c,p];
  donut(dist);

}
function donut(dist){
  d3.selectAll("path").remove();
  var color = d3.scaleOrdinal(d3.schemeCategory10);

        var svg = d3.select('#pie_svg')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .style('stroke-width',1)
          .attr('transform', 'translate(' + (width / 2) +
            ',' + (height / 2) + ')');

        var arc = d3.arc()
          .innerRadius(radius - donutWidth)
          .outerRadius(radius);

        var pie = d3.pie()
          .value(function(d) { return d; })
          .sort(null);

        var path = svg.selectAll('path')
          .data(pie(dist))
          .enter()
          .append('path')
          .attr('d', arc)
          .style("stroke","black")
          .style("stroke-width",1)
          .attr('fill', function(d, i) {
            return color(i);
          })
          .on('mouseout', function (d, i,n) {
              		        d3.select(this).transition()
          	               .duration('50')
                             .attr('opacity', '1')
                             .style("stroke","black")
                             .style("stroke-width",1)
                             svg.selectAll("text").remove();
                         })
         .on('mouseover', function(d, i, n ) {

                         		          d3.select(this).transition()
                                 	        .duration('50')
                                            .style("stroke","black")
                                            .style("stroke-opacity","1")
                                            .style("stroke-width",4)
                                      	  svg.append("text")
                         	   				        .attr("text-anchor", "middle")
                         		 			          .attr('font-size', '20')
                                            .style("font-weight","bold")
                         		       		      .attr('y', 4)

                         		   			        .text(()=>{
                                              if(i.index==0){
                                                return "Vowels: "+i.value;
                                              } else if(i.index==1){
                                                return "Consonants: "+i.value;
                                              } else{
                                                return "Punctuations: "+i.value;
                                              }
                                            })
                                     })

          .on('click', function(d,i,n){

            if(i.index==0){

              barGraph(countV,i.index);
            } else if(i.index==1){

              barGraph(countC,i.index);
            }else{

              barGraph(countP,i.index);
            }

          });
}
function barGraph(data,i){
  colors=filling(i)
  let data1=[]
  var max=d3.max(Object.values(data))
  for (let k of Object.keys(data)){
    data1.push({"label":k, "value":data[k]})
  }
  var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  d3.select("#bar1_svg").remove();
  var svg1 = d3.selectAll('#bar_svg')
    .append('svg')
    .attr("id","bar1_svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform","translate(" + margin + "," + margin + ")");

    var x = d3.scaleBand()
    .domain(data1.map(function(d){return d['label']}))
    .range([0,500])
    .padding(0.1)

    svg1.append("g")
    .attr("transform", "translate(0,320)")
    .call(d3.axisBottom(x).ticks(max))
    .select("text")
    //.attr("font-size" ,"12")
    .attr("font-weight" ,"200");

    var y = d3.scaleLinear()
    .domain([0,max])
    .range([330,0]);

    svg1.append("g")
    .call(d3.axisLeft(y).ticks(10))
    .attr("transform", "translate(0,-10)")
    .select("text");

    svg1.selectAll(".bar")
     .data(data1)
    .enter()
    .append("rect")
    .attr("x", function(d) { return x(d.label);})
    .attr("y", function(d) {return y(d.value)-10;})
    .attr("height", function(d) { return 330-y(d.value);})
    .attr("width",x.bandwidth())
    .attr("fill",colors)
    .style("stroke","black")
    .style("stroke-width",1)
    .on("mouseover", function(event,d) {

       div.transition()
         .duration(200)
         .style("opacity",1);
         div.html("Character: "+ d.label + "<br/>" + "Count: " + d.value)
         .style("font-weight","bold")
         .style("left", (event.pageX) + "px")
         .style("top", (event.pageY - 28) + "px");
       })
       .on("mouseout", function(d) {
       div.transition()
         .duration(500)
         .style("opacity", 0);
       });

}

function DataG(value,i){
  var result;
  if(i==0){
    result={a:0,e:0,i:0,o:0,u:0,y:0};
  }else if(i==1){
    result={b:0,c:0,d:0,f:0,g:0,h:0,j:0,k:0,l:0,m:0,n:0,p:0,q:0,r:0,s:0,t:0,v:0,w:0,x:0,z:0};
  }
  else{
    result={".":0,",":0,"?":0,"!":0,":":0,";":0};
  }
  for(let j of value){
    result[j]=result[j]+1
  }
return result;
}

function filling(i) {
  if(i==0){
    colors='#1f77b4';
  }else if(i==1){
    colors='#FF6600';
  }
  else{
    colors='#2CA02C';
  }
  return colors;
}
