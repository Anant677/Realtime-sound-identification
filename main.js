song1 = "";
song2 = "";
scoreright = 0;
rightwristx = 0;
rightwristy = 0;
scoreleft = 0;
leftwristx = 0;
leftwristy = 0;
function preload(){
song1 = loadSound("music.mp3");
song2 = loadSound("music2.mp3");
apple = loadImage("images.jfif");
}
function setup(){
    video = createCapture(VIDEO);
    video.hide();
    canvas = createCanvas(400,400);
    canvas.center();

    poseNet = ml5.poseNet(video,modeLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video,0,0,400,400);

    
    status_song1 = song1.isPlaying();
    status_song2 = song2.isPlaying();

    fill("red");
    stroke("red");

    if(scoreleft > 0.2){
        circle(leftwristx,leftwristy,20);
        song1.stop();

        if(song2 == false){
            song.play(song2);
            document.getElementById("btn").innerHTML = "Playing Peter Pan Song";
        }
    }

    if(scoreright >0.2 ){
    circle(rightwristx,rightwristy,20);
    song2.stop();

    if(song1 == false){
        song2.play();
        document.getElementById("btn").innerHTML = "Playing Harry Poter Song";
    }
    }
}
function play_song(){
    song1.play();
    song1.setVolume(2);
    song1.rate(1);
}
function stop_song(){
    song1.stop();
}
function gotPoses(results){
    console.log("done");
if(results.length>0){
    console.log(results);
    scoreright = results[0].pose.keypoints[10].score;
    rightwristx = results[0].pose.rightWrist.x;
    rightwristy = results[0].pose.rightWrist.y;

    scoreleft = results[0].pose.keypoints[10].score;
    leftwristx = results[0].pose.leftWrist.x;
    leftwristy = results[0].pose.leftWrist.y;
}
}
function modeLoaded(){
    console.log("PoseNet is Initialised");
}