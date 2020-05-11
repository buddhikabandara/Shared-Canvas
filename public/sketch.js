var socket;
function setup()
{
  createCanvas(1000,570);
  socket=io.connect("http://localhost:9900");
  socket.on("mouse",newDrawing);
}
function draw()
{

}

function mouseDragged(){
  noStroke();
  fill(0);
  if(mouseX>=0 && mouseX<1600 && mouseY>=0 && mouseY<=900)
  {
    ellipse(mouseX,mouseY,20,20);
    var data = {
      x:mouseX,
      y:mouseY
    }
    socket.emit("mouse",data);
    console.log("sent "+mouseX+" , "+mouseY );
  }

}
function newDrawing(data)
{
  noStroke();
  fill(0);

  ellipse(data.x,data.y,20,20);
}
