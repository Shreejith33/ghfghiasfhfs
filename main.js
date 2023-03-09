noseX = 0;
noseY = 0;
difference = 0;
rightWristX = 0;
leftWristX = 0;
confidence = 0;

function preload()
{
    
}

function setup()
{
    video = createCapture(VIDEO);
    video.size(550, 550);

    canvas = createCanvas(550, 550);
    canvas.position(560, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized!');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = " + noseX + " noseY = " + noseY);
        confidence = results[0].pose.nose.confidence;

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);

        console.log("leftWristX = " + leftWristX + " rightWristX = " + rightWristX + " difference = " + difference);
    }
}


function draw()
{
    background('#969A97');
      fill('#F90093');
      stroke('#F90093');

      if(confidence < 0.1)
      {
        document.getElementById('Square').innerHTML =  "NOT DETECTED!";

      }
      else
      {
        textSize(difference)
        text('A', noseX, noseY)
        document.getElementById('Square').innerHTML = "Width and Height of the Text = " + Math.abs(difference);
      }
}