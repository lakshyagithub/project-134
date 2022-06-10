
var status1 = "";
var alarm = "";
//let capture;
objects = [];


function preload() {
  alarm = loadSound('alarm.mp3');
}

function setup() {
  canvas = createCanvas(400, 400);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(400, 400);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function draw() {

  image(video, 0, 0, 400, 400);
  if (status1 == true) {
    for (var i = 0; i < objects.length; i++){
      fill(255, 0, 0);
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
      noFill();
      stroke(255, 0, 0);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
    
}
  //image(capture, 0, 0, 400, 400);

}
function modelLoaded() {
  console.log("cocossd is ready!");
  status1 = true;
  objectDetector.detect(video, gotResults);
}

function gotResults(error, results) {
  if (error) { 
    console.log(error);
  }
  console.log(results);
  objects = results;
}