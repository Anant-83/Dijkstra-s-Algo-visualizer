const height = 600, 
      width  = 600;


class Graph{
      constructor() {
        this.edges = {};
        this.nodes = [];
      }

      add_node(node)
      {
        this.nodes.push(node);
        this.edges[node] = [];
      }

      add_edge(source, destination , weight)
      {
        this.edges[source].push({node: destination, weight: weight});
      }
}   




class QElement {
  constructor(distance, node) {
        this.distance = distance;
        this.node = node;
  }
}
class PriorityQueue {
  constructor() {
        this.items = [];
  }
  Push(distance,node){
        var qElement = new QElement(distance,node);
        var contain = false;
  
        for(var i = 0;i<this.items.length;i++){
              if(this.items[i].distance > qElement.distance){
                    this.items.splice(i,0,qElement);
                    contain = true;
                    break;
              }
        }

        if(contain == false){
              this.items.push(qElement);
        }
  }
  isEmpty(){
        return this.items.length == 0;
  }
  Pop(){
        if(this.isEmpty()){
              console.log("No element in priority queue");
              return;
        }
        this.items.shift();
  }
  Top(){
        if(this.isEmpty()){
              console.log("No element in priority queue");
              return;
        }
        return this.items[0];
  }
  printPQ(){
        if(this.isEmpty()){
              console.log("No element in priority queue");
              return;
        }
        for(var i=0;i<this.items.length;i++){
              console.log("("+this.items[i].distance+","+this.items[i].node+")");
        }
  }
}
var g = new Graph();
var pq = new PriorityQueue();
var n = parseInt(prompt("Enter number of vertex :- "));
var nodes = [];

for(var i=0 ; i<n; i++)
{
  g.add_node(i);
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
  w = parseInt(document.getElementById("wgt").value);
  // console.log("Hii")

  if(s < 0 || d < 0 || s >= n || d >= n)
  {
    alert("Invalid Source or Destination Vertex!!");
    document.getElementById("src").value = ' ';
    document.getElementById("dst").value = ' ';
    document.getElementById("wgt").value = ' ';
    modal.style.display = "none";
    return;
  }
  links.push({source : s , target : d});
  g.add_edge(s,d,w);
  // console.log(s);
  // console.log(d);
  reset(links)
  // var ans = Dijkstra(0);
  // console.log(ans)
  document.getElementById("src").value = ' ';
  document.getElementById("dst").value = ' ';
  document.getElementById("wgt").value = ' ';
  modal.style.display = "none";
}


var main_source = 0;
function Dijkstra(source)
{
  var dis = [];
  for(var i = 0; i  < n ; i++)
  {
    dis[i] = 100001;
  }
  dis[source] = 0;
  var pq = new PriorityQueue();
  pq.Push(0,source);
  while(!pq.isEmpty())
  {
    var cur_node = pq.Top().node;
    var cur_dis = pq.Top().distance;
    console.log(pq.Top())
    pq.Pop();
    for(var i = 0; i < g.edges[cur_node].length; i++)
    {
      var nodee = g.edges[cur_node][i].node;
      var dis1 = g.edges[cur_node][i].weight;
      console.log(dis1)
      console.log(nodee)
      if(dis[nodee] > dis[cur_node] + dis1)
      {
        console.log(dis1 + dis[cur_node]);
        dis[nodee] = dis[cur_node] + dis1;
        pq.Push(nodee);
      }
    }
  }

  console.log(dis);
  return dis;

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
                .attr('stroke','yellow');  
                
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
