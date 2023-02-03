const height = 600, 
      width  = 600;


var n = parseInt(prompt("Enter number of vertex :- "));
var nodes = [];

for(var i=0 ;i<n; i++)
{
  nodes[i] = {'id' : i , reflexive: true};
}
var links = [
  // {source : 0, target : 1},
  // {source : 0, target : 2},
]; 
var s,d;

var svg = d3.select("body")
.append('svg')
.attr("width",width)
.attr("height",height);


var s,d;
function adding()
{
  // var s = parseInt(prompt("er:"));
  // var d = parseInt(prompt("er:"));
  s = parseInt(document.getElementById("src").value);
  d = parseInt(document.getElementById("dst").value);
  // console.log("Hii")
  console.log(s);
  console.log(d);
    if(s < 0 || d < 0 || s >= n || d >= n)
    {
      alert("Invalid Source or Destination Vertex!!");
      document.getElementById("src").value = ' ';
      document.getElementById("dst").value = ' ';
      modal.style.display = "none";
      return;
    }
    links.push({source : s , target : d});
    console.log(s);
    console.log(d);
    reset(links)
    console.log(links.length);
    document.getElementById("src").value = ' ';
    document.getElementById("dst").value = ' ';
    modal.style.display = "none";
  }
  var lines
var src = -1 , dst = -1;


var circles = svg.selectAll('circle')
.data(nodes)
.enter()
.append('circle')
.attr('r',15)
.style('fill','blue')



var text = svg.selectAll('text')
.data(nodes)
.enter()
.append('text')
.text((node) => node.id)





var force = d3.layout.force()
              .nodes(nodes)
              .links(links)
              .size([width, height])
              .charge(-800)
              .linkDistance(100)
              .on('tick', tick)
              .start()
              
              
              function reset(links)
              {
                
                lines = svg.selectAll('line').data(links)
                
                lines.enter()
                .append('line')
                .transition()
                .attr('stroke','black');  
                
                lines.exit()
                .transition()
                .remove();
                
  force.start();
}

reset(links)

function tick(){
  circles.attr('x1', function(d) {return d.x})
  .attr('x1', function(d) {return d.y})
  .attr("transform", function (d) {
    return "translate(" + d.x + "," + d.y + ")";
  })
  
  lines.attr('x1',(link)=> link.source.x)
  .attr('y1',(link)=> link.source.y)
  .attr('x2',(link)=> link.target.x)
  .attr('y2',(link)=> link.target.y); 
  
  text.attr('x', (node) => node.x)
  .attr('y', (node) => node.y);
}
