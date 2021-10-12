objects=[];
stat="";
function setup(){
    canvas= createCanvas(380, 380);
    canvas.position(580, 310);
    video= createCapture(VIDEO);
    video.size(380 , 380);
    video.hide();
}

function start(){
        objectDetector = ml5.objectDetector('cocossd', modelLoaded);
        document.getElementById("status").innerHTML="Status: Detecting Objects";
        input = document.getElementById("object_name").value;
        console.log(input);
}

function modelLoaded(){
        console.log("Model Loaded");
        stat= true;
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(stat != ""){
        r= random(255);
        g= random(255);
        b= random(255);
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status : Objects Detected";
            fill('#FF0000');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y +15);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label==input){
                objectDetector.detect(gotResult);
                document.getElementById("detect").innerHTML= input + " found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input + " found");
                synth.speak(utterThis)
            }
            else{
                document.getElementById("detect").innerHTML= input + " not found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input + " not found");
                synth.speak(utterThis)
            }
        }
    }
}

function gotResult(error , result){
    if (error){
        console.log(error);
    }
    console.log(result);
    objects=result;
}