var video;
var status1 = "";
objects = [];
var song;
function preload(){
    song = loadSound("coffin_dance.mp3");

}
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide()

    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
}

function modelLoaded() {
    console.log("Model Loaded!");
    status1 = true;
    document.getElementById("status").innerHTML = "Detecting Object(s)"
    
}
function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;

    }
}
function draw() {

    image(video, 0, 0, 380, 380);


    if (status1 == true) {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
            r = random(255);
            g = random(255);
            b = random(255);
            fill(r, g, b);
            strokeWeight(1);
            textSize(20);
            document.getElementById("status").innerHTML = "Objects Detected !!";
            document.getElementById("noObjects").innerHTML = objects.length;
            percent = floor(objects[i].confidence * 100) + " %";
            x = objects[i].x;
            y = objects[i].y;
            width = objects[i].width;
            height = objects[i].height;
            text(objects[i].label + " " + percent, x + 15, y + 25);
            noFill();
            stroke(r, g, b);
            strokeWeight(3);
            rect(x, y, width, height);

            if(objects[i].label == "person"){
                document.getElementById("noObjects").innerHTML = " True";
                song.stop()
            }
            else{
                document.getElementById("noObjects").innerHTML = " False";
                song.play();
            }


        }
        if(objects.length == 0){
            document.getElementById("noObjects").innerHTML = " False";
                song.play();
        }
    }










}