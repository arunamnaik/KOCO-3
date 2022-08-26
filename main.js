video = "";
status1 = "";
objects = [];
percent = "";

function preload(){
    video = createCapture(VIDEO);
    video.hide();
}

function setup(){
    canvas = createCanvas(480,360);
    canvas.center();
}

function draw(){
    image(video,0,0,480,360);
    if(status1 != ""){
        objectDetector.detect(video,gotResult);
        for (let i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "NUMBER OF OBJECTS DETECTED ARE = " + objects.length;
            fill("#e03f3f");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#e03f3f");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector("cocossd",modalLoaded);
    document.getElementById("status").innerHTML = "STATUS :- DETECTING OBJECTS.";
}

function modalLoaded(){
    console.log("MODAL LOADED!");
    status1 = true;
    video.loop();
    video.speed(1);video.volume(0);
    objectDetector.detect(gotResult);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}